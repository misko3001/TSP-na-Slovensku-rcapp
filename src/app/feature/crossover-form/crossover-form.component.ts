import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TSPCrossover, TSPCrossover2LabelMapping} from "../../shared/model/TSPCrossover";

@Component({
  selector: 'app-crossover-form',
  templateUrl: './crossover-form.component.html',
  styleUrls: ['./crossover-form.component.css']
})
export class CrossoverFormComponent {

  @Input() crossoverForm!: FormGroup;

  public crossoverTypes = Object.values(TSPCrossover);

  public crossover2Label: Record<TSPCrossover, string> = TSPCrossover2LabelMapping;

  constructor() { }
}
