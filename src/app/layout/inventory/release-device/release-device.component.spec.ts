import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseDeviceComponent } from './release-device.component';

describe('ReleaseDeviceComponent', () => {
  let component: ReleaseDeviceComponent;
  let fixture: ComponentFixture<ReleaseDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleaseDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
