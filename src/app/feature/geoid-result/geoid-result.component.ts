import {Component, Input, OnInit} from '@angular/core';
import {TSPResult} from "../../shared/model/TSPResult";

@Component({
  selector: 'app-geoid-result',
  templateUrl: './geoid-result.component.html',
  styleUrls: ['./geoid-result.component.css']
})
export class GeoidResultComponent implements OnInit {

  @Input()
  result?: TSPResult;

  constructor() { }

  ngOnInit(): void {
  }

}
