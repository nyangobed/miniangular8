import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovescheduleComponent } from './approveschedule.component';

describe('ApprovescheduleComponent', () => {
  let component: ApprovescheduleComponent;
  let fixture: ComponentFixture<ApprovescheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovescheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovescheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
