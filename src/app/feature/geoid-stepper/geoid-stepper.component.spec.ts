import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoidStepperComponent } from './geoid-stepper.component';

describe('GeoidStepperComponent', () => {
  let component: GeoidStepperComponent;
  let fixture: ComponentFixture<GeoidStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoidStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoidStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
