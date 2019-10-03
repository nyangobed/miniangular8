import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledDownloadsReportsComponent } from './scheduled-downloads-reports.component';

describe('ScheduledDownloadsReportsComponent', () => {
  let component: ScheduledDownloadsReportsComponent;
  let fixture: ComponentFixture<ScheduledDownloadsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledDownloadsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledDownloadsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
