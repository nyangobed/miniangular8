import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePartsrequisitionComponent } from './create-partsrequisition.component';

describe('CreatePartsrequisitionComponent', () => {
  let component: CreatePartsrequisitionComponent;
  let fixture: ComponentFixture<CreatePartsrequisitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePartsrequisitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePartsrequisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
