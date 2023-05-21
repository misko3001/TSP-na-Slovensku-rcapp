import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GeoidRequestDto} from "../../shared/model/GeoidRequestDto";

@Component({
  selector: 'app-geoid-form',
  templateUrl: './geoid-form.component.html',
  styleUrls: ['./geoid-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoidFormComponent implements OnInit {

  geoidForm: FormGroup;

  @Input()
  hasWaypoints: boolean = false;

  @Input()
  awaitingResponse: boolean = false;

  @Output()
  request: EventEmitter<GeoidRequestDto>;

  constructor() {
    this.request = new EventEmitter<GeoidRequestDto>();
    this.geoidForm = new FormGroup({
      maxIterations: new FormControl(1000, [
        Validators.required,
        Validators.min(1)
      ]),
      swapMutationChance: new FormControl(0.15, [
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ]),
      crossoverChance: new FormControl(0.25, [
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ])
    });
  }

  ngOnInit(): void {
  }

  public emitRequest(): void {
    this.request.emit({
      maxIterations: this.geoidForm.value.maxIterations!,
      swapMutationChance: this.geoidForm.value.swapMutationChance!,
      crossoverChance: this.geoidForm.value.crossoverChance!
    });
  }

  public isFormValid(): any {
    return this.geoidForm.valid && !this.awaitingResponse && this.hasWaypoints ? null : true;
  }
}
