import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDeliveryComponent } from './approve-delivery.component';

describe('ApproveDeliveryComponent', () => {
  let component: ApproveDeliveryComponent;
  let fixture: ComponentFixture<ApproveDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
