import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveGeographicalRegionsComponent } from './approve-geographical-regions.component';

describe('ApproveGeographicalRegionsComponent', () => {
  let component: ApproveGeographicalRegionsComponent;
  let fixture: ComponentFixture<ApproveGeographicalRegionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveGeographicalRegionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveGeographicalRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
