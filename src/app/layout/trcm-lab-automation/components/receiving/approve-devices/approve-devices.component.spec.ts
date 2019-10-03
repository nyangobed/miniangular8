import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDevicesComponent } from './approve-devices.component';

describe('ApproveDevicesComponent', () => {
  let component: ApproveDevicesComponent;
  let fixture: ComponentFixture<ApproveDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
