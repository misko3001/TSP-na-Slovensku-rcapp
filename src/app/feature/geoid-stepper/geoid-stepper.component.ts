import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {WaypointDto} from "../../shared/model/WaypointDto";
import {SlovakRequestDto} from "../../shared/model/SlovakRequestDto";
import {distinctUntilChanged} from "rxjs";
import {TSPSelector} from "../../shared/model/TSPSelector";
import {TerminationDto} from "../../shared/model/TerminationDto";
import {GeoidRequestDto} from "../../shared/model/GeoidRequestDto";

@Component({
  selector: 'app-geoid-stepper',
  templateUrl: './geoid-stepper.component.html',
  styleUrls: ['./geoid-stepper.component.css']
})
export class GeoidStepperComponent implements AfterViewInit {

  @Input() pointsStep!: FormGroup;

  @Input() points: WaypointDto[] = [];

  configStepForm: FormGroup;

  selectorStepForm: FormGroup;

  mutatorStepForm: FormGroup;

  crossoverStepForm: FormGroup;

  termiantionStepForm: FormGroup;

  @Output()
  readonly geoidRequest = new EventEmitter<GeoidRequestDto>();

  @Output()
  readonly deletePoint = new EventEmitter<string | null>();

  private get offspringSelectorModifier(): AbstractControl {
    return this.selectorStepForm.controls['offspringSelectorModifier'];
  }

  private get parentSelectorModifier(): AbstractControl {
    return this.selectorStepForm.controls['parentSelectorModifier'];
  }

  constructor(private cd: ChangeDetectorRef) {
    this.configStepForm = new FormGroup({
      populationSize: new FormControl(50, [
        Validators.required,
        Validators.min(1)
      ]),
      maxPhenotypeAge: new FormControl(70, [
        Validators.required,
        Validators.min(1)
      ]),
      offspringFraction: new FormControl(0.5, [
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ]),
      publishEachGeneration: new FormControl(null, [
        Validators.min(1),
      ])
    });

    this.selectorStepForm = new FormGroup({
      offspringSelector: new FormControl(null, [
        Validators.required,
      ]),
      offspringSelectorModifier: new FormControl(null),
      offspringEliteSelectorValue: new FormControl(null, [
        Validators.min(1)
      ]),
      parentSelector: new FormControl(null),
      parentSelectorModifier: new FormControl(null),
      parentEliteSelectorValue: new FormControl(null, [
        Validators.min(1)
      ])
    });
    this.mutatorStepForm = new FormGroup({
      mutator: new FormControl(null, [
        Validators.required,
      ]),
      mutatorModifier: new FormControl(0.15, [
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ])
    });
    this.crossoverStepForm = new FormGroup({
      crossover: new FormControl(null, [
        Validators.required,
      ]),
      crossoverModifier: new FormControl(0.25, [
        Validators.required,
        Validators.min(0),
        Validators.max(1)
      ])
    });
    this.termiantionStepForm = new FormGroup({
      maxGenerations: new FormControl(5000, [
        Validators.required,
        Validators.min(1)
      ]),
      maxSteadyFitnessGenerations: new FormControl(null, [
        Validators.min(1),
      ]),
      chronoUnit: new FormControl(null, [
        Validators.min(1),
      ]),
      chronoValue: new FormControl(null),
      shortFilter: new FormControl(null, [
        Validators.min(1),
      ]),
      longFilter: new FormControl(null, [
        Validators.min(2),
      ]),
      epsilon: new FormControl(null, [
        Validators.min(0),
        Validators.max(1)
      ])
    });
  }

  ngAfterViewInit(): void {
    this.selectorStepForm.controls['offspringSelector'].valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: TSPSelector) => {
      this.clearValidatorsFromControl(this.offspringSelectorModifier);
      switch (value) {
        case TSPSelector.TOURNAMENT:
          this.offspringSelectorModifier.setValue(3);
          this.addValidatorsToControl(this.offspringSelectorModifier, [Validators.required, Validators.min(2)]);
          break;
        case TSPSelector.BOLTZMANN:
          this.offspringSelectorModifier.setValue(3.5);
          this.addValidatorsToControl(this.offspringSelectorModifier, [Validators.required]);
          break;
        case TSPSelector.LINEAR_RANK:
          this.offspringSelectorModifier.setValue(0.5);
          this.addValidatorsToControl(this.offspringSelectorModifier, [Validators.required, Validators.min(0)]);
          break;
        case TSPSelector.EXPONENTIAL_RANK:
          this.offspringSelectorModifier.setValue(0.975);
          this.addValidatorsToControl(this.offspringSelectorModifier,
            [Validators.required, Validators.min(0), Validators.max(0.999999999)]);
          break;
        case TSPSelector.MONTE_CARLO:
        case TSPSelector.ROULETTE_WHEEL:
        case TSPSelector.STOCHASTIC_UNIVERSAL:
          this.offspringSelectorModifier.setValue(null);
      }
      this.cd.detectChanges();
    })

    this.selectorStepForm.controls['parentSelector'].valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: TSPSelector) => {
      this.clearValidatorsFromControl(this.parentSelectorModifier);
      switch (value) {
        case TSPSelector.TOURNAMENT:
          this.parentSelectorModifier.setValue(3);
          this.addValidatorsToControl(this.parentSelectorModifier, [Validators.required, Validators.min(2)]);
          break;
        case TSPSelector.BOLTZMANN:
          this.parentSelectorModifier.setValue(3.5);
          this.addValidatorsToControl(this.parentSelectorModifier, [Validators.required]);
          break;
        case TSPSelector.LINEAR_RANK:
          this.parentSelectorModifier.setValue(0.5);
          this.addValidatorsToControl(this.parentSelectorModifier, [Validators.required, Validators.min(0)]);
          break;
        case TSPSelector.EXPONENTIAL_RANK:
          this.parentSelectorModifier.setValue(0.975);
          this.addValidatorsToControl(this.parentSelectorModifier,
            [Validators.required, Validators.min(0), Validators.max(0.999999999)]);
          break;
        case TSPSelector.MONTE_CARLO:
        case TSPSelector.ROULETTE_WHEEL:
        case TSPSelector.STOCHASTIC_UNIVERSAL:
          this.parentSelectorModifier.setValue(null);
      }
      this.cd.detectChanges();
    })
  }

  private addValidatorsToControl(control: AbstractControl, validators: ValidatorFn | ValidatorFn[]): void {
    control.addValidators(validators);
    control.updateValueAndValidity();
  }

  private clearValidatorsFromControl(control: AbstractControl): void {
    control.clearValidators();
    control.updateValueAndValidity();
  }

  public createRequest(): void {
    let termination: TerminationDto = new TerminationDto(
      this.termiantionStepForm.controls['maxGenerations'].value,
      this.termiantionStepForm.controls['maxSteadyFitnessGenerations'].value,
      this.termiantionStepForm.controls['chronoUnit'].value,
      this.termiantionStepForm.controls['chronoValue'].value,
      this.termiantionStepForm.controls['shortFilter'].value,
      this.termiantionStepForm.controls['longFilter'].value,
      this.termiantionStepForm.controls['epsilon'].value
    );

    let publishEachGeneration = this.configStepForm.controls['publishEachGeneration'].value;
    let request: SlovakRequestDto = new GeoidRequestDto(
      [],
      termination,
      [this.selectorStepForm.controls['offspringSelector'].value, this.selectorStepForm.controls['parentSelector'].value],
      [this.selectorStepForm.controls['offspringSelectorModifier'].value, this.selectorStepForm.controls['parentSelectorModifier'].value],
      [this.selectorStepForm.controls['offspringEliteSelectorValue'].value, this.selectorStepForm.controls['parentEliteSelectorValue'].value],
      this.mutatorStepForm.controls['mutator'].value,
      this.mutatorStepForm.controls['mutatorModifier'].value,
      this.crossoverStepForm.controls['crossover'].value,
      this.crossoverStepForm.controls['crossoverModifier'].value,
      this.configStepForm.controls['populationSize'].value,
      this.configStepForm.controls['offspringFraction'].value,
      publishEachGeneration != null ? this.getProcessId() : null,
      publishEachGeneration,
      this.configStepForm.controls['maxPhenotypeAge'].value);
    console.log(request.processId)
    this.geoidRequest.emit(request);
    this.cd.detectChanges();
  }

  deletePoints(): void {
    this.deletePoint.emit(null);
  }

  deleteSinglePoint(name: string): void {
    this.deletePoint.emit(name);
  }

  public checkConstraints(): void {
    this.cd.detectChanges();
  }

  private getProcessId(): string {
    let ms = Date.now();
    let id = ms + '-';
    const characters = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      id += characters.charAt(randomIndex);
    }
    return id;
  }
}
