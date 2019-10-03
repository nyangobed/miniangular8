import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstquarterComponent } from './firstquarter.component';

describe('FirstquarterComponent', () => {
  let component: FirstquarterComponent;
  let fixture: ComponentFixture<FirstquarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstquarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
