import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Input, OnChanges,
  Output, SimpleChanges
} from '@angular/core';
import {WaypointDto} from "../../shared/model/WaypointDto";
import {MapDataService} from "../../shared/service/map-data-service/map-data.service";
import {FilterService} from 'primeng/api';
import {FormControl} from "@angular/forms";
import {MatSelectionListChange} from "@angular/material/list/selection-list";

@Component({
  selector: 'app-slovak-waypoint-list-form',
  templateUrl: './waypoint-list-form.component.html',
  styleUrls: ['./waypoint-list-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WaypointListFormComponent implements OnChanges {
  @Input()
  selectedPoints: ReadonlyArray<WaypointDto> = [];

  @Input()
  parentPoints: ReadonlyArray<WaypointDto> = [];

  pointsControl = new FormControl([]);

  points: WaypointDto[] = [];

  filter: string = '';

  filteredPoints: WaypointDto[] = [];

  @Output()
  added: EventEmitter<WaypointDto> = new EventEmitter<WaypointDto>();

  @Output()
  removed: EventEmitter<WaypointDto> = new EventEmitter<WaypointDto>();

  @Output()
  reset = new EventEmitter<void>();

  constructor(private dataService: MapDataService,
              private filterService: FilterService,
              private cd: ChangeDetectorRef) {
    dataService.getPoints().then(value => {
      this.points = value;
      this.filteredPoints = this.points;
      cd.detectChanges();
    });
  }

  ngOnChanges({selectedPoints}: SimpleChanges) {
    if (selectedPoints) {
      this.pointsControl.reset();
      this.resetMarkers();

      this.pointsControl.setValue(this.selectedPoints.map(point => point.name));
      this.selectedPoints.forEach(point => this.addMarker(point))
    }
  }

  onPointChange({option}: MatSelectionListChange): void {
    const point = this.filteredPoints.find(({name}) => name === option.value);
    point && this[option.selected ? 'addMarker' : 'removeMarker'](point);
  }

  filterByName(): void {
    this.filteredPoints = this.points;
    if (this.filter != '') {
      this.filteredPoints = this.filteredPoints.filter(value => this.filterService.filters.startsWith(value.name, this.filter));
    }
    this.pointsControl.setValue(this.parentPoints.map(point => point.name));
    this.cd.detectChanges();
  }

  private addMarker(point: WaypointDto): void {
    this.added.emit(point);
  }

  private removeMarker(point: WaypointDto): void {
    this.removed.emit(point);
  }

  private resetMarkers(): void {
    this.reset.emit();
  }
}
