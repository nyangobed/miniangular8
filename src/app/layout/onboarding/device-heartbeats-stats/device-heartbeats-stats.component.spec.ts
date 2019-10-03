import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceHeartbeatsStatsComponent } from './device-heartbeats-stats.component';

describe('DeviceHeartbeatsStatsComponent', () => {
  let component: DeviceHeartbeatsStatsComponent;
  let fixture: ComponentFixture<DeviceHeartbeatsStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceHeartbeatsStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceHeartbeatsStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
