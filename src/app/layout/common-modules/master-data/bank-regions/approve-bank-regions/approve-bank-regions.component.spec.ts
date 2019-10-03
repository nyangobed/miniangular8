import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBankRegionsComponent } from './approve-bank-regions.component';

describe('ApproveBankRegionsComponent', () => {
  let component: ApproveBankRegionsComponent;
  let fixture: ComponentFixture<ApproveBankRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveBankRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBankRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
