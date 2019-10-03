import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceFtpLogsComponent } from './device-ftp-logs.component';

describe('DeviceFtpLogsComponent', () => {
  let component: DeviceFtpLogsComponent;
  let fixture: ComponentFixture<DeviceFtpLogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceFtpLogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceFtpLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
