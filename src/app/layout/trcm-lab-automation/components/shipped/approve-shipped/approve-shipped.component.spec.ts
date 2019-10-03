import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveShippedComponent } from './approve-shipped.component';

describe('ApproveShippedComponent', () => {
  let component: ApproveShippedComponent;
  let fixture: ComponentFixture<ApproveShippedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveShippedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveShippedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
