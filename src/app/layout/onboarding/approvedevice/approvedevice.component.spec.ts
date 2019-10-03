import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedeviceComponent } from './approvedevice.component';

describe('ApprovedeviceComponent', () => {
  let component: ApprovedeviceComponent;
  let fixture: ComponentFixture<ApprovedeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
