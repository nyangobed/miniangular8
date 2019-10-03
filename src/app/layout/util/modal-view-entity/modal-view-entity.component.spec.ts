import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewEntityComponent } from './modal-view-entity.component';

describe('ModalViewEntityComponent', () => {
  let component: ModalViewEntityComponent;
  let fixture: ComponentFixture<ModalViewEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalViewEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalViewEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
