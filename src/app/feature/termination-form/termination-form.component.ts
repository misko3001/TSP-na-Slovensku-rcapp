import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {ExecutionTime, ExecutionTime2LabelMapping} from "../../shared/model/ExecutionTime";

@Component({
  selector: 'app-termination-form',
  templateUrl: './termination-form.component.html',
  styleUrls: ['./termination-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TerminationFormComponent {

  @Input() terminationForm!: FormGroup;

  public time2Label: Record<ExecutionTime, string> = ExecutionTime2LabelMapping;

  public timeTypes = Object.values(ExecutionTime);

  public enableSteadyFitnessTermination: boolean = false;

  public enableTimeTermination: boolean = false;

  public enableFitnessConvergenceTermination: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  public enableSteadyFitnessForm(): void {
    this.enableSteadyFitnessTermination = !this.enableSteadyFitnessTermination;
    if (this.enableSteadyFitnessTermination) {
      this.terminationForm.controls['maxSteadyFitnessGenerations'].setValue(25);
    } else {
      this.terminationForm.controls['maxSteadyFitnessGenerations'].setValue(null);
    }
    this.cd.detectChanges();
  }

  public enableTimeForm(): void {
    this.enableTimeTermination = !this.enableTimeTermination;
    if (this.enableTimeTermination) {
      this.terminationForm.controls['chronoUnit'].setValue(ExecutionTime.MINUTES);
      this.terminationForm.controls['chronoValue'].setValue(5);
    } else {
      this.terminationForm.controls['chronoUnit'].setValue(null);
      this.terminationForm.controls['chronoValue'].setValue(null);
    }
    this.cd.detectChanges();
  }

  public enableFitnessConvergenceForm(): void {
    this.enableFitnessConvergenceTermination = !this.enableFitnessConvergenceTermination;
    if (this.enableFitnessConvergenceTermination) {
      this.terminationForm.controls['shortFilter'].setValue(5);
      this.terminationForm.controls['longFilter'].setValue(15);
      this.terminationForm.controls['epsilon'].setValue(0.00001);
    } else {
      this.terminationForm.controls['shortFilter'].setValue(null);
      this.terminationForm.controls['longFilter'].setValue(null);
      this.terminationForm.controls['epsilon'].setValue(null);
    }
    this.cd.detectChanges();
  }

}
