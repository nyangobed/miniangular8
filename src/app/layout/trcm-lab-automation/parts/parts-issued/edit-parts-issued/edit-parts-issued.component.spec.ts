import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartsIssuedComponent } from './edit-parts-issued.component';

describe('EditPartsIssuedComponent', () => {
  let component: EditPartsIssuedComponent;
  let fixture: ComponentFixture<EditPartsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
