import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPendingOrdersComponent } from './edit-pending-orders.component';

describe('EditPendingOrdersComponent', () => {
  let component: EditPendingOrdersComponent;
  let fixture: ComponentFixture<EditPendingOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPendingOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPendingOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
