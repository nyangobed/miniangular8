import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGeographicalRegionsComponent } from './view-geographical-regions.component';

describe('ViewGeographicalRegionsComponent', () => {
  let component: ViewGeographicalRegionsComponent;
  let fixture: ComponentFixture<ViewGeographicalRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGeographicalRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGeographicalRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
