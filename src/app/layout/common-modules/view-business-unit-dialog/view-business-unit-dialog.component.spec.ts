import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBusinessUnitDialogComponent } from './view-business-unit-dialog.component';

describe('ViewBusinessUnitDialogComponent', () => {
  let component: ViewBusinessUnitDialogComponent<any>;
  let fixture: ComponentFixture<ViewBusinessUnitDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBusinessUnitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBusinessUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
