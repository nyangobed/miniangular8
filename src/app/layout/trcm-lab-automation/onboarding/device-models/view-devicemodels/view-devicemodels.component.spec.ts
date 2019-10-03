import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDevicemodelsComponent } from './view-devicemodels.component';

describe('ViewDevicemodelsComponent', () => {
  let component: ViewDevicemodelsComponent;
  let fixture: ComponentFixture<ViewDevicemodelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDevicemodelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDevicemodelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
