import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerReportsComponent } from './manufacturer-reports.component';

describe('ManufacturerReportsComponent', () => {
  let component: ManufacturerReportsComponent;
  let fixture: ComponentFixture<ManufacturerReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
