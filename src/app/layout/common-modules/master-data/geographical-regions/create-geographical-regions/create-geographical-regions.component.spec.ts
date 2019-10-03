import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGeographicalRegionsComponent } from './create-geographical-regions.component';

describe('CreateGeographicalRegionsComponent', () => {
  let component: CreateGeographicalRegionsComponent;
  let fixture: ComponentFixture<CreateGeographicalRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateGeographicalRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGeographicalRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
