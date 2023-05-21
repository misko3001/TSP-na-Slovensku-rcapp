import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormComponent {

  @Input() configForm!: FormGroup;

  public enableSubscriptionInput: boolean = false;

  constructor(private cd: ChangeDetectorRef) { }

  public enableSubscriptionForm(): void {
    this.enableSubscriptionInput = !this.enableSubscriptionInput;
    if (this.enableSubscriptionInput) {
      this.configForm.controls['publishEachGeneration'].setValue(5);
    } else {
      this.configForm.controls['publishEachGeneration'].setValue(null);
    }
    this.cd.detectChanges();
  }
}
