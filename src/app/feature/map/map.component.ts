import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit} from '@angular/core';
import Map from 'ol/Map';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit {

  @Input()
  public map?: Map;

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit() {
    this.map?.setTarget(this.elementRef.nativeElement);
  }
}
