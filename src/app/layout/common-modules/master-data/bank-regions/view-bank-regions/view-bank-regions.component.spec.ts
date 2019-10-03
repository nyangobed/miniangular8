import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBankRegionsComponent } from './view-bank-regions.component';

describe('ViewBankRegionsComponent', () => {
  let component: ViewBankRegionsComponent;
  let fixture: ComponentFixture<ViewBankRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBankRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBankRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
