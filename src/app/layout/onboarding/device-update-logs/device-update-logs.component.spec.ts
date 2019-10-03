import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceUpdateLogsComponent } from './device-update-logs.component';

describe('DeviceUpdateLogsComponent', () => {
  let component: DeviceUpdateLogsComponent;
  let fixture: ComponentFixture<DeviceUpdateLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceUpdateLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceUpdateLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
