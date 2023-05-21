import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlovakStepperComponent } from './slovak-stepper.component';

describe('SlovakStepperComponent', () => {
  let component: SlovakStepperComponent;
  let fixture: ComponentFixture<SlovakStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlovakStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlovakStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
