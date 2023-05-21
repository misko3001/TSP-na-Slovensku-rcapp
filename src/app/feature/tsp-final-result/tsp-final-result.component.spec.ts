import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TspFinalResultComponent } from './tsp-final-result.component';

describe('TspFinalResultComponent', () => {
  let component: TspFinalResultComponent;
  let fixture: ComponentFixture<TspFinalResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TspFinalResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TspFinalResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
