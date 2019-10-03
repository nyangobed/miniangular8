import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDevicesComponent } from './single-devices.component';

describe('SingleDevicesComponent', () => {
  let component: SingleDevicesComponent;
  let fixture: ComponentFixture<SingleDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
