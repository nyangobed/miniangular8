import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetcontractComponent } from './setcontract.component';

describe('SetcontractComponent', () => {
  let component: SetcontractComponent;
  let fixture: ComponentFixture<SetcontractComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetcontractComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetcontractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
