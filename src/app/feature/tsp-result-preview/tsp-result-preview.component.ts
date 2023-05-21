import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SlovakResult} from "../../shared/model/SlovakResult";
import {SlovakService} from "../../shared/service/slovak-service/slovak.service";
import {toFixed} from "ol/math";

@Component({
  selector: 'app-tsp-result-preview',
  templateUrl: './tsp-result-preview.component.html',
  styleUrls: ['./tsp-result-preview.component.scss'],
})
export class TspResultPreviewComponent {

  currentGenerationIndex: number | undefined;

  results: SlovakResult[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) readonly processId: string,
              @Inject(SlovakService) slovakService: SlovakService) {
    slovakService.getTemporaryResults(this.processId, (value) => {
      let result: SlovakResult = JSON.parse(value.body);
      result.length = toFixed(result.length, 3);
      if (this.currentGenerationIndex == undefined) {
        this.currentGenerationIndex = 0;
      }
      this.results.push(result);
    })
  }
}
