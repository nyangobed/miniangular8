import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceonboardingComponent } from './deviceonboarding.component';

describe('DeviceonboardingComponent', () => {
  let component: DeviceonboardingComponent;
  let fixture: ComponentFixture<DeviceonboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceonboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceonboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
