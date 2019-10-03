import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteComponent1Component } from './delete-component1.component';

describe('DeleteComponent1Component', () => {
  let component: DeleteComponent1Component;
  let fixture: ComponentFixture<DeleteComponent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteComponent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
