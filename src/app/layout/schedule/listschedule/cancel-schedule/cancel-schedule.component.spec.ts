import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelScheduleComponent } from './cancel-schedule.component';

describe('CancelScheduleComponent', () => {
  let component: CancelScheduleComponent<any>;
  let fixture: ComponentFixture<CancelScheduleComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
