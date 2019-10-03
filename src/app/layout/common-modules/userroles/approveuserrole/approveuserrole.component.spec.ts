import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveuserroleComponent } from './approveuserrole.component';

describe('ApproveuserroleComponent', () => {
  let component: ApproveuserroleComponent;
  let fixture: ComponentFixture<ApproveuserroleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveuserroleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveuserroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
