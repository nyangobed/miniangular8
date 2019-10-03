import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListTemplateComponent } from './device-list-template.component';

describe('DeviceListTemplateComponent', () => {
  let component: DeviceListTemplateComponent;
  let fixture: ComponentFixture<DeviceListTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
