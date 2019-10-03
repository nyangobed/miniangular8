import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadingReportsComponent } from './downloading-reports.component';

describe('DownloadingReportsComponent', () => {
  let component: DownloadingReportsComponent;
  let fixture: ComponentFixture<DownloadingReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadingReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
