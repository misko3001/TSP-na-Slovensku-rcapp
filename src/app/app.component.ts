import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {MapResizeService} from "./shared/service/map-resize-service/map-resize.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {

  title: string = "rcapp-gen-alg"

  constructor(private resizeService: MapResizeService) {

  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  menuChange(): void {
    setTimeout(() => {
      this.resizeService.resizeMap();
    }, 500)
  }


}
