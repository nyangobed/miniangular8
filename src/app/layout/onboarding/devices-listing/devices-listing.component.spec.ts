import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicesListingComponent } from './devices-listing.component';

describe('DevicesListingComponent', () => {
  let component: DevicesListingComponent;
  let fixture: ComponentFixture<DevicesListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
