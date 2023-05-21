import {Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {TSPMutator, TSPMutator2LabelMapping} from "../../shared/model/TSPMutator";

@Component({
  selector: 'app-mutator-form',
  templateUrl: './mutator-form.component.html',
  styleUrls: ['./mutator-form.component.css']
})
export class MutatorFormComponent {

  @Input() mutatorForm!: FormGroup;

  public mutatorTypes = Object.values(TSPMutator);

  public mutator2Label: Record<TSPMutator, string> = TSPMutator2LabelMapping;

  constructor() { }
}
