import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDiagnosisComponent } from './approve-diagnosis.component';

describe('ApproveDiagnosisComponent', () => {
  let component: ApproveDiagnosisComponent;
  let fixture: ComponentFixture<ApproveDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
