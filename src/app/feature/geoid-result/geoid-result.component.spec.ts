import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoidResultComponent } from './geoid-result.component';

describe('GeoidResultComponent', () => {
  let component: GeoidResultComponent;
  let fixture: ComponentFixture<GeoidResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoidResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoidResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
