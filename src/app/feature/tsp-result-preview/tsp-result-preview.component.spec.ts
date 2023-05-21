import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TspResultPreviewComponent } from './tsp-result-preview.component';

describe('TspResultPreviewComponent', () => {
  let component: TspResultPreviewComponent;
  let fixture: ComponentFixture<TspResultPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TspResultPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TspResultPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
