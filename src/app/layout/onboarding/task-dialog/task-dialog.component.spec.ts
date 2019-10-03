import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent<any>;
  let fixture: ComponentFixture<TaskDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
