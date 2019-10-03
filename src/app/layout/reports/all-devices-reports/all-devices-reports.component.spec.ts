import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDevicesReportsComponent } from './all-devices-reports.component';

describe('AllDevicesReportsComponent', () => {
  let component: AllDevicesReportsComponent;
  let fixture: ComponentFixture<AllDevicesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDevicesReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDevicesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
