import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';
import Map from 'ol/Map';
import ControlScaleLine from 'ol/control/ScaleLine';

@Component({
  selector: 'app-scaleline',
  templateUrl: './scaleline.component.html',
  styleUrls: ['./scaleline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScalelineComponent implements OnInit {

  @Input()
  public map?: Map;

  public control?: ControlScaleLine;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.control = new ControlScaleLine({
      target: this.elementRef.nativeElement,
    });
    this.map?.addControl(this.control);
  }

}
