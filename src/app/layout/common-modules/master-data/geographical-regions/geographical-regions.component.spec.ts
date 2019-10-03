import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicalRegionsComponent } from './geographical-regions.component';

describe('GeographicalRegionsComponent', () => {
  let component: GeographicalRegionsComponent;
  let fixture: ComponentFixture<GeographicalRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeographicalRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeographicalRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
