import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdevicecustomerComponent } from './editdevicecustomer.component';

describe('EditdevicecustomerComponent', () => {
  let component: EditdevicecustomerComponent<any>;
  let fixture: ComponentFixture<EditdevicecustomerComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditdevicecustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditdevicecustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
