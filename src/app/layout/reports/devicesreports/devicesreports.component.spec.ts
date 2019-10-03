import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesreportsComponent } from './devicesreports.component';

describe('DevicesreportsComponent', () => {
  let component: DevicesreportsComponent;
  let fixture: ComponentFixture<DevicesreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
