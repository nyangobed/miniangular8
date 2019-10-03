import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcurrencyComponent } from './viewcurrency.component';

describe('ViewcurrencyComponent', () => {
  let component: ViewcurrencyComponent;
  let fixture: ComponentFixture<ViewcurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
