import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCustomersComponent } from './approve-customers.component';

describe('ApproveCustomersComponent', () => {
  let component: ApproveCustomersComponent;
  let fixture: ComponentFixture<ApproveCustomersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveCustomersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
