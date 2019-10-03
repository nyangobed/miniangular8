import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogActionsComponent } from './dialog-actions.component';

describe('DialogActionsComponent', () => {
  let component: DialogActionsComponent<any>;
  let fixture: ComponentFixture<DialogActionsComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
