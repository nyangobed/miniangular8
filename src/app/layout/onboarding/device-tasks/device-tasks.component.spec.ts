import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTasksComponent } from './device-tasks.component';

describe('DeviceTasksComponent', () => {
  let component: DeviceTasksComponent;
  let fixture: ComponentFixture<DeviceTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
