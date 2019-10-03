import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdepartmentComponent } from './viewdepartment.component';

describe('ViewdepartmentComponent', () => {
  let component: ViewdepartmentComponent;
  let fixture: ComponentFixture<ViewdepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewdepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewdepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
