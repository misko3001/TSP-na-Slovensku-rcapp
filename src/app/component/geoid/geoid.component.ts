import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {GeoidRequestDto} from "../../shared/model/GeoidRequestDto";
import {Subject, Subscription} from "rxjs";
import {GeoidService} from "../../shared/service/geoid-service/geoid.service";
import {OSM, Vector as VectorSource} from "ol/source";
import Map from "ol/Map";
import {WaypointDto} from "../../shared/model/WaypointDto";
import {MapService} from "../../shared/service/map-service/map.service";
import {Feature, View} from "ol";
import TileLayer from "ol/layer/Tile";
import {Vector as VectorLayer} from "ol/layer";
import {toLonLat} from "ol/proj";
import Swal from "sweetalert2";
import {GPX} from "ol/format";
import {Stroke, Style} from "ol/style";
import {MapResizeService} from "../../shared/service/map-resize-service/map-resize.service";

@Component({
  selector: 'app-geoid',
  templateUrl: './geoid.component.html',
  styleUrls: ['./geoid.component.css']
})
export class GeoidComponent implements OnInit, OnDestroy {

  markerSource = new VectorSource({});

  trackSource = new VectorSource({});

  title: string = "rcapp-gen-alg"

  map?: Map;

  clickedCoords: Subject<number[]> = new Subject<number[]>();

  waypoints: WaypointDto[];

  awaitingResponse: boolean = false;

  private sub: Subscription;

  constructor(private geoidService: GeoidService,
              private mapService: MapService,
              private resizeService: MapResizeService,
              private cd: ChangeDetectorRef) {
    this.waypoints = [];
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
    this.map.on('click', event => {
      this.clickedCoords.next(toLonLat(event.coordinate));
    })
    this.onMarkerAdded();
    this.onMenuResize();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public calculate(request: GeoidRequestDto): void {
    request.waypoints = this.waypoints;
    this.removeVectorLayer(this.trackSource);
    this.awaitingResponse = true;
    this.sub.add(this.geoidService.calculate(request).subscribe(data => {
      // console.log(data);
      const val = data.shortestPath.length > 4 ? `bodov` : `body`;
      Swal.fire(`Optimálna cesta pre ${data.shortestPath.length} ` + val,
        `Optimalna cesta ma dlzku ${data.fullLength.toFixed(3)} km <br>`,
        'success')
      const features = new GPX().readFeatures(data.gpx, {
        dataProjection: 'EPSG:4326',
        featureProjection: this.map?.getView().getProjection()
      });
      this.resetTrackLayer(features[0]);
      this.awaitingResponse = false;
      this.cd.detectChanges();
    }));
  }

  public setWaypoints(waypoints: WaypointDto[]): void {
    this.waypoints = waypoints;
    if (this.waypoints.length == 0) {
      this.removeVectorLayer(this.trackSource);
      this.resetMarkerLayer();
    }
  }

  private onMarkerAdded(): void {
    this.sub.add(this.mapService.onFeatureAdded().subscribe((data) => {
      this.removeVectorLayer(this.trackSource);
      data.getGeometry()?.transform('EPSG:4326', this.map?.getView().getProjection());
      this.markerSource.addFeature(data);
    }));
  }

  private onMenuResize(): void {
    this.sub.add(this.resizeService.onMenuResize().subscribe(() => {
      this.map?.updateSize();
    }));
  }

  private resetTrackLayer(feature: Feature): void {
    //this.removeVectorLayer(this.map?.getLayers(), this.trackSource);
    this.trackSource = new VectorSource({});
    feature.setStyle(new Style({
      stroke: new Stroke({
        color: [0, 0, 0, 255],
        width: 3
      })
    }));
    this.trackSource.addFeature(feature);
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


}
