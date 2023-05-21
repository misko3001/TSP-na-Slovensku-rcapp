import {Component, Input} from '@angular/core';
import {FinalSlovakResult} from "../../shared/model/FinalSlovakResult";

@Component({
  selector: 'app-tsp-final-result',
  templateUrl: './tsp-final-result.component.html',
  styleUrls: ['./tsp-final-result.component.scss']
})
export class TspFinalResultComponent {

  @Input()
  result: FinalSlovakResult | undefined;

  constructor() { }

}
