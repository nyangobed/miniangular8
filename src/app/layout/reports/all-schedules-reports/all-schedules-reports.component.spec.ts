import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSchedulesReportsComponent } from './all-schedules-reports.component';

describe('AllSchedulesReportsComponent', () => {
  let component: AllSchedulesReportsComponent;
  let fixture: ComponentFixture<AllSchedulesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllSchedulesReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSchedulesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
