import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoidFormComponent } from './geoid-form.component';

describe('GeoidFormComponent', () => {
  let component: GeoidFormComponent;
  let fixture: ComponentFixture<GeoidFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoidFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
