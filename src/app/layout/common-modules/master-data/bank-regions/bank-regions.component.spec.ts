import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BankRegionsComponent } from './bank-regions.component';

describe('BankRegionsComponent', () => {
  let component: BankRegionsComponent;
  let fixture: ComponentFixture<BankRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BankRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
