import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditDialogComponent } from './audit-dialog.component';

describe('AuditDialogComponent', () => {
  let component: AuditDialogComponent<any>;
  let fixture: ComponentFixture<AuditDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
