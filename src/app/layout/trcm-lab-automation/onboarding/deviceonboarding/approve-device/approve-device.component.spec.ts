import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeviceComponent } from './approve-device.component';

describe('ApproveDeviceComponent', () => {
  let component: ApproveDeviceComponent;
  let fixture: ComponentFixture<ApproveDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
