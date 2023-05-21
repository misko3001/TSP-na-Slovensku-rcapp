import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoidComponent } from './geoid.component';

describe('GeoidComponent', () => {
  let component: GeoidComponent;
  let fixture: ComponentFixture<GeoidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoidComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
