import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedepartmentComponent } from './approvedepartment.component';

describe('ApprovedepartmentComponent', () => {
  let component: ApprovedepartmentComponent;
  let fixture: ComponentFixture<ApprovedepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
