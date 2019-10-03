import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasedDevicesReportsComponent } from './released-devices-reports.component';

describe('ReleasedDevicesReportsComponent', () => {
  let component: ReleasedDevicesReportsComponent;
  let fixture: ComponentFixture<ReleasedDevicesReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReleasedDevicesReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleasedDevicesReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
