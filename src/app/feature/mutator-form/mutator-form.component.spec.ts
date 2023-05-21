import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MutatorFormComponent } from './mutator-form.component';

describe('MutatorFormComponent', () => {
  let component: MutatorFormComponent;
  let fixture: ComponentFixture<MutatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MutatorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MutatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
