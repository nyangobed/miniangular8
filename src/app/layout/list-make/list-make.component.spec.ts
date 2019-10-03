import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMakeComponent } from './list-make.component';

describe('ListMakeComponent', () => {
  let component: ListMakeComponent;
  let fixture: ComponentFixture<ListMakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
