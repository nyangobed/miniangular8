import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceMakeComponent } from './device-make.component';

describe('DeviceMakeComponent', () => {
  let component: DeviceMakeComponent;
  let fixture: ComponentFixture<DeviceMakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceMakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
