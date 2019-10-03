import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerDialogComponent } from './checker-dialog.component';

describe('CheckerDialogComponent', () => {
  let component: CheckerDialogComponent<any>;
  let fixture: ComponentFixture<CheckerDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
