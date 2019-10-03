import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardedDeviceReportsComponent } from './onboarded-device-reports.component';

describe('OnboardedDeviceReportsComponent', () => {
  let component: OnboardedDeviceReportsComponent;
  let fixture: ComponentFixture<OnboardedDeviceReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardedDeviceReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardedDeviceReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
