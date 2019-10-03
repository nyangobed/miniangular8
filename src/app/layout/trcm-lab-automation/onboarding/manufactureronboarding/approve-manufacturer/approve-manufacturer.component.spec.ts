import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveManufacturerComponent } from './approve-manufacturer.component';

describe('ApproveManufacturerComponent', () => {
  let component: ApproveManufacturerComponent;
  let fixture: ComponentFixture<ApproveManufacturerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveManufacturerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveManufacturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
