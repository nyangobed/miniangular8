import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpartrequisitionComponent } from './editpartrequisition.component';

describe('EditpartrequisitionComponent', () => {
  let component: EditpartrequisitionComponent;
  let fixture: ComponentFixture<EditpartrequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditpartrequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditpartrequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
