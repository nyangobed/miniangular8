import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecommissionDeviceComponent } from './decommission-device.component';

describe('DecommissionDeviceComponent', () => {
  let component: DecommissionDeviceComponent;
  let fixture: ComponentFixture<DecommissionDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecommissionDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecommissionDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
