import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {WaypointDto} from "../../shared/model/WaypointDto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Observable, Subscription} from "rxjs";
import {
  CoordinateFormatterService
} from "../../shared/service/coordinate-formatter/coordinate-formatter.service";
import {MapService} from "../../shared/service/map-service/map.service";
import {Point} from "ol/geom";
import {Feature} from "ol";
import {Icon, Style} from "ol/style";

@Component({
  selector: 'app-waypoint-form',
  templateUrl: './waypoint-form.component.html',
  styleUrls: ['./waypoint-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaypointFormComponent implements OnInit, OnDestroy {

  public waypointForm!: FormGroup;

  public waypointNames: Map<string, null> = new Map();

  public waypoints: WaypointDto[] = [];

  private sub: Subscription = new Subscription();

  @Input()
  public clickedCoords!: Observable<number[]>;

  @Output()
  public waypointEmitter: EventEmitter<WaypointDto[]> = new EventEmitter<WaypointDto[]>();

  constructor(private modalService: NgbModal,
              private coordinateFormatter: CoordinateFormatterService,
              private cd: ChangeDetectorRef,
              private mapService: MapService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.sub = this.clickedCoords.subscribe((value) => {
      const coords = this.coordinateFormatter.numberCoordinates(value, 4).split(" ");
      this.waypointForm.controls['longitude'].setValue(coords[0]);
      this.waypointForm.controls['latitude'].setValue(coords[1]);
      this.cd.detectChanges();
    });
  }

  public deletePoint(name: string): void {
    this.waypoints = this.waypoints.filter(value => !(value.name === name));
    this.waypointNames.delete(name);
    this.waypointEmitter.emit(this.waypoints);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public addWaypoint(waypoint: WaypointDto): void {
    this.waypointNames.set(waypoint.name, null);
    this.waypoints.push(waypoint);
    this.waypointForm.reset();
    this.renderPoints(waypoint);
    this.waypointEmitter.emit(this.waypoints);
  }

  public isFormValid(): any {
    return this.waypointForm.valid && !this.waypointNames.has(this.waypointForm.value.name.trim()) ? null : true;
  }

  public fullReset(): void {
    this.waypointForm.reset();
    this.waypointNames.clear();
    this.waypoints = [];
    this.waypointEmitter.emit(this.waypoints);
  }

  private createForm(): void {
    this.waypointForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1)
      ]),
      latitude: new FormControl(null, [
        Validators.required,
        Validators.min(-90),
        Validators.max(90)
      ]),
      longitude: new FormControl(null, [
        Validators.required,
        Validators.min(-180),
        Validators.max(180)
      ])
    });
  }

  private renderPoints(waypoint: WaypointDto): void {
    const feature = new Feature({
      geometry: new Point([waypoint.longitude, waypoint.latitude]),
      name: waypoint.name,
      id: waypoint.name
    })
    feature.setId(waypoint.name);
    feature.setStyle(new Style({
      image: new Icon({
        scale: 0.05,
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        anchor: [0.5, 500],
        src: "assets/marker.png"
      })
    }))
    this.mapService.addFeature(feature);
  }

}
