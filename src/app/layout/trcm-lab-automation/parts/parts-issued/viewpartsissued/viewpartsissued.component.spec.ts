import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpartsissuedComponent } from './viewpartsissued.component';

describe('ViewpartsissuedComponent', () => {
  let component: ViewpartsissuedComponent;
  let fixture: ComponentFixture<ViewpartsissuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewpartsissuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewpartsissuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
