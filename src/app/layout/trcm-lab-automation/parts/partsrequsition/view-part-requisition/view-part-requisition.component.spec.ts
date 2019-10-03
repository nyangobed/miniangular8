import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartRequisitionComponent } from './view-part-requisition.component';

describe('ViewPartRequisitionComponent', () => {
  let component: ViewPartRequisitionComponent;
  let fixture: ComponentFixture<ViewPartRequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPartRequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPartRequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
