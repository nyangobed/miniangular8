import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsentordersComponent } from './viewsentorders.component';

describe('ViewsentordersComponent', () => {
  let component: ViewsentordersComponent;
  let fixture: ComponentFixture<ViewsentordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsentordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsentordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
