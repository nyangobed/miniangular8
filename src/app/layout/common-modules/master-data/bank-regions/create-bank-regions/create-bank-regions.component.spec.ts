import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBankRegionsComponent } from './create-bank-regions.component';

describe('CreateBankRegionsComponent', () => {
  let component: CreateBankRegionsComponent;
  let fixture: ComponentFixture<CreateBankRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBankRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBankRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
