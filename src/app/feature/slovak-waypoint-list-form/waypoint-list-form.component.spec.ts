import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaypointListFormComponent } from './waypoint-list-form.component';

describe('WaypointListFormComponent', () => {
  let component: WaypointListFormComponent;
  let fixture: ComponentFixture<WaypointListFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaypointListFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaypointListFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
