import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListbusinessunitComponent } from './listbusinessunit.component';

describe('ListbusinessunitComponent', () => {
  let component: ListbusinessunitComponent;
  let fixture: ComponentFixture<ListbusinessunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListbusinessunitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListbusinessunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
