import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngenicoReportsComponent } from './ingenico-reports.component';

describe('IngenicoReportsComponent', () => {
  let component: IngenicoReportsComponent;
  let fixture: ComponentFixture<IngenicoReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngenicoReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngenicoReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
