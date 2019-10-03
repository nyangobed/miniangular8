import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeviceModelComponent } from './approve-device-model.component';

describe('ApproveDeviceModelComponent', () => {
  let component: ApproveDeviceModelComponent;
  let fixture: ComponentFixture<ApproveDeviceModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeviceModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeviceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
