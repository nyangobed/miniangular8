import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewreceivedordersComponent } from './viewreceivedorders.component';

describe('ViewreceivedordersComponent', () => {
  let component: ViewreceivedordersComponent;
  let fixture: ComponentFixture<ViewreceivedordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewreceivedordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewreceivedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
