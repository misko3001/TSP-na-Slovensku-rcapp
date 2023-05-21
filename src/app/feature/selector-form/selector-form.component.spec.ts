import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorFormComponent } from './selector-form.component';

describe('SelectorFormComponent', () => {
  let component: SelectorFormComponent;
  let fixture: ComponentFixture<SelectorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
