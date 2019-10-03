import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerActionsComponent } from './checker-actions.component';

describe('CheckerActionsComponent', () => {
  let component: CheckerActionsComponent;
  let fixture: ComponentFixture<CheckerActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
