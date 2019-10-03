import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkgroupComponent } from './view-workgroup.component';

describe('ViewWorkgroupComponent', () => {
  let component: ViewWorkgroupComponent;
  let fixture: ComponentFixture<ViewWorkgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
