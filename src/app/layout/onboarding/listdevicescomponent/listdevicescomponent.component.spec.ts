import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdevicescomponentComponent } from './listdevicescomponent.component';

describe('ListdevicescomponentComponent', () => {
  let component: ListdevicescomponentComponent;
  let fixture: ComponentFixture<ListdevicescomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdevicescomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdevicescomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
