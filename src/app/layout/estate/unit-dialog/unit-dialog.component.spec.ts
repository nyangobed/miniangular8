import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitDialogComponent } from './unit-dialog.component';

describe('UnitDialogComponent', () => {
  let component: UnitDialogComponent<any>;
  let fixture: ComponentFixture<UnitDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
