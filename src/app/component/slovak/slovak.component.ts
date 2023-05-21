import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {OSM, Vector as VectorSource} from "ol/source";
import Map from "ol/Map";
import {Subscription} from "rxjs";
import {WaypointDto} from "../../shared/model/WaypointDto";
import {Feature, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {Vector as VectorLayer} from "ol/layer";
import {Icon, Stroke, Style} from "ol/style";
import {Point} from "ol/geom";
import {Polyline} from "ol/format";
import {MapDataService} from "../../shared/service/map-data-service/map-data.service";
import {RouteRequestDto} from "../../shared/model/RouteRequestDto";
import {MapResizeService} from "../../shared/service/map-resize-service/map-resize.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SlovakService} from "../../shared/service/slovak-service/slovak.service";
import {SlovakRequestDto} from "../../shared/model/SlovakRequestDto";
import {MatDialog} from "@angular/material/dialog";
import {TspResultPreviewComponent} from "../../feature/tsp-result-preview/tsp-result-preview.component";
import {toFixed} from "ol/math";
import {FinalSlovakResult} from "../../shared/model/FinalSlovakResult";

@Component({
  selector: 'app-slovak',
  templateUrl: './slovak.component.html',
  styleUrls: ['./slovak.component.css']
})
export class SlovakComponent implements OnInit, OnDestroy {

  markerSource = new VectorSource({});

  trackSource = new VectorSource({});

  result: FinalSlovakResult | undefined;

  map?: Map;

  waypoints: WaypointDto[];

  waypointForm: FormGroup;

  awaitingResponse: boolean = false;

  randomPoints: ReadonlyArray<WaypointDto> = [];

  private sub: Subscription;

  constructor(@Inject(MatDialog) private readonly dialog: MatDialog,
              private cd: ChangeDetectorRef,
              private dataService: MapDataService,
              private slovakService: SlovakService,
              private resizeService: MapResizeService) {
    this.waypoints = [];
    this.waypointForm = new FormGroup({
      waypointCount: new FormControl(this.waypoints.length, [
        Validators.required,
        Validators.min(2)
      ])
    });
    this.sub = new Subscription();
  }

  ngOnInit() {
    this.map = new Map({
      view: new View({
        center: [2187100.4828, 6208367.6696],
        zoom: 7.8,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          zIndex: 10,
          source: this.markerSource
        })
      ],
      target: 'ol-map'
    });
    this.onMenuResize();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openModal(data: string): void {
    const dialogRef = this.dialog.open(TspResultPreviewComponent, {
      data
    });
  }

  getRandomPoints(counter?: number): void {
    this.dataService.getPoints().then(points => {
      this.randomPoints = points.sort(() => Math.random() - Math.random()).slice(0, counter);
    })
  }

  public calculate(request: SlovakRequestDto): void {
    this.resetTrackLayer();
    request.points = this.waypoints;
    this.awaitingResponse = true;
    if (request.processId) {
      this.openModal(request.processId);
    }

    this.slovakService.calculate(request).subscribe(result => {
      this.result = result;
      this.result.length = toFixed(result.length, 3);
      this.result.duration = toFixed(result.duration, 3);

      let routes: string[] = result.route;
      let counter: number = 1;
      for (let i = 0; i < routes.length - 1; i++) {
        this.addRoute(routes[i], routes[(i + 1)]).then(() => {
          counter++;
          if (counter == routes.length) {
            this.awaitingResponse = false;
            this.cd.detectChanges();
          }
        });
      }
    });
  }

  public setWaypoints(waypoints: WaypointDto[]): void {
    this.waypoints = waypoints;
    if (this.waypoints.length == 0) {
      this.removeVectorLayer(this.trackSource);
      this.resetMarkerLayer();
    }
  }

  public addMarker(waypoint: WaypointDto): void {
    const marker = new Feature({
      geometry: new Point([waypoint.longitude, waypoint.latitude]),
      name: waypoint.name,
      id: waypoint.name
    });
    marker.setId(waypoint.name);
    marker.setStyle(new Style({
      image: new Icon({
        scale: 0.05,
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        anchor: [0.5, 500],
        src: "assets/marker.png"
      })
    }));

    this.resetTrackLayer();
    marker.getGeometry()?.transform('EPSG:4326', this.map?.getView().getProjection());
    this.markerSource.addFeature(marker);

    this.waypoints.push(waypoint)
    this.waypointForm.controls['waypointCount'].setValue(this.waypoints.length);

    this.cd.detectChanges();
  }

  public removeMarker(waypoint: WaypointDto): void {
    this.resetTrackLayer();
    const feature = this.markerSource.getFeatureById(waypoint.name);
    if (feature != null) {
      this.markerSource.removeFeature(feature)
      this.waypoints.splice(this.waypoints.indexOf(waypoint), 1);
      this.waypointForm.controls['waypointCount'].setValue(this.waypoints.length);
      this.cd.detectChanges();
    }
  }

  resetMarkers(): void {
    this.resetTrackLayer();
    this.markerSource.clear();
    this.waypoints.length = 0;
    this.cd.detectChanges();
  }

  private async addRoute(start: string, end: string): Promise<void> {
    this.sub.add(this.dataService.getRoute(new RouteRequestDto(start, end)).subscribe(route => {
      const geometry = new Polyline().readGeometry(route.polyline);
      const feature = new Feature({
        type: 'route',
        geometry: geometry
      });
      feature.getGeometry()?.transform('EPSG:4326', this.map?.getView().getProjection());
      feature.setStyle(new Style({
        stroke: new Stroke({
          color: [200, 0, 0, 255],
          width: 3
        })
      }));
      this.trackSource.addFeature(feature);
    }));
  }

  private resetTrackLayer(): void {
    this.removeVectorLayer(this.trackSource);
    this.trackSource = new VectorSource({});
    this.map?.addLayer(new VectorLayer({
      zIndex: 5,
      source: this.trackSource
    }));
  }

  private resetMarkerLayer(): void {
    this.removeVectorLayer(this.markerSource);
    this.markerSource = new VectorSource({});
    this.map?.addLayer(new VectorLayer({
      zIndex: 10,
      source: this.markerSource
    }));
  }

  private removeVectorLayer(source: VectorSource): void {
    this.map?.getLayers().forEach((layer) => {
      if (layer instanceof VectorLayer && layer.getSource() === source) {
        this.map?.removeLayer(layer);
        return;
      }
    });
  }

  private onMenuResize(): void {
    this.sub.add(this.resizeService.onMenuResize().subscribe(() => {
      this.map?.updateSize();
    }));
  }
}
