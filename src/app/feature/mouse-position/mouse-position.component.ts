import {Component, OnInit, ChangeDetectionStrategy, Input, ElementRef} from '@angular/core';
import {CoordinateFormatterService} from "../../shared/service/coordinate-formatter/coordinate-formatter.service";
import Map from 'ol/Map';
import ControlMousePosition from 'ol/control/MousePosition';

@Component({
  selector: 'app-mouse-position',
  templateUrl: './mouse-position.component.html',
  styleUrls: ['./mouse-position.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MousePositionComponent implements OnInit {

  @Input()
  public map?: Map;

  @Input()
  public positionTemplate?: string;

  control?: ControlMousePosition;

  constructor(
    private element: ElementRef,
    private coordinateFormatter: CoordinateFormatterService,
  ) {
  }

  ngOnInit() {
    this.control = new ControlMousePosition({
      className: 'mouseposition-control',
      projection: 'EPSG:4326',
      coordinateFormat: (coordinates: number[] | any) => this.coordinateFormatter
        .numberCoordinates(coordinates, 4, this.positionTemplate),
      target: this.element.nativeElement
    });
    this.map?.addControl(this.control);
  }
}
