import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecommissionedReportsComponent } from './decommissioned-reports.component';

describe('DecommissionedReportsComponent', () => {
  let component: DecommissionedReportsComponent;
  let fixture: ComponentFixture<DecommissionedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecommissionedReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecommissionedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
