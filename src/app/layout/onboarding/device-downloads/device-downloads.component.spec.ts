import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceDownloadsComponent } from './device-downloads.component';

describe('DeviceDownloadsComponent', () => {
  let component: DeviceDownloadsComponent;
  let fixture: ComponentFixture<DeviceDownloadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDownloadsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDownloadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
