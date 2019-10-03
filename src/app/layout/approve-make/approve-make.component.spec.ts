import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveMakeComponent } from './approve-make.component';

describe('ApproveMakeComponent', () => {
  let component: ApproveMakeComponent;
  let fixture: ComponentFixture<ApproveMakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveMakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
