import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovepartsIssuedComponent } from './approveparts-issued.component';

describe('ApprovepartsIssuedComponent', () => {
  let component: ApprovepartsIssuedComponent;
  let fixture: ComponentFixture<ApprovepartsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovepartsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovepartsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
