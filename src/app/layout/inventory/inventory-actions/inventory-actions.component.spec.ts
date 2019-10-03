import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryActionsComponent } from './inventory-actions.component';

describe('InventoryActionsComponent', () => {
  let component: InventoryActionsComponent;
  let fixture: ComponentFixture<InventoryActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
