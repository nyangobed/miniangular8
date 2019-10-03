import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDowloadsReportsComponent } from './failed-dowloads-reports.component';

describe('FailedDowloadsReportsComponent', () => {
  let component: FailedDowloadsReportsComponent;
  let fixture: ComponentFixture<FailedDowloadsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FailedDowloadsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FailedDowloadsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
