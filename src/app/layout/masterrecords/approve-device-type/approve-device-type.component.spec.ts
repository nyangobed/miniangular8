import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeviceTypeComponent } from './approve-device-type.component';

describe('ApproveDeviceTypeComponent', () => {
  let component: ApproveDeviceTypeComponent;
  let fixture: ComponentFixture<ApproveDeviceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeviceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeviceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
