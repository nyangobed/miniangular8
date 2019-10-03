import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneoffDevicesComponent } from './oneoff-devices.component';

describe('OneoffDevicesComponent', () => {
  let component: OneoffDevicesComponent;
  let fixture: ComponentFixture<OneoffDevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneoffDevicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneoffDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
