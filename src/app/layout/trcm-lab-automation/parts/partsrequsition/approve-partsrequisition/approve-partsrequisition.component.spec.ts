import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePartsrequisitionComponent } from './approve-partsrequisition.component';

describe('ApprovePartsrequisitionComponent', () => {
  let component: ApprovePartsrequisitionComponent;
  let fixture: ComponentFixture<ApprovePartsrequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePartsrequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePartsrequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
