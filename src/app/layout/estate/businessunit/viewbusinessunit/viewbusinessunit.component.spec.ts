import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbusinessunitComponent } from './viewbusinessunit.component';

describe('ViewbusinessunitComponent', () => {
  let component: ViewbusinessunitComponent;
  let fixture: ComponentFixture<ViewbusinessunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewbusinessunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewbusinessunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
