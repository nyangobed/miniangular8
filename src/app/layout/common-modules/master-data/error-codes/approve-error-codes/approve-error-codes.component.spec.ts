import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveErrorCodesComponent } from './approve-error-codes.component';

describe('ApproveErrorCodesComponent', () => {
  let component: ApproveErrorCodesComponent;
  let fixture: ComponentFixture<ApproveErrorCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveErrorCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveErrorCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
