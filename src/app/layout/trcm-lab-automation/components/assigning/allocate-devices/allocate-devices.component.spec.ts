import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateDevicesComponent } from './allocate-devices.component';

describe('AllocateDevicesComponent', () => {
  let component: AllocateDevicesComponent;
  let fixture: ComponentFixture<AllocateDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
