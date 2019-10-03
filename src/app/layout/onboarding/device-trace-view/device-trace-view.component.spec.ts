import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTraceViewComponent } from './device-trace-view.component';

describe('DeviceTraceViewComponent', () => {
  let component: DeviceTraceViewComponent<any>;
  let fixture: ComponentFixture<DeviceTraceViewComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTraceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTraceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
