import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovepartsmasterComponent } from './approvepartsmaster.component';

describe('ApprovepartsmasterComponent', () => {
  let component: ApprovepartsmasterComponent;
  let fixture: ComponentFixture<ApprovepartsmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovepartsmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovepartsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
