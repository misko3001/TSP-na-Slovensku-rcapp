import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossoverFormComponent } from './crossover-form.component';

describe('CrossoverFormComponent', () => {
  let component: CrossoverFormComponent;
  let fixture: ComponentFixture<CrossoverFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossoverFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrossoverFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
