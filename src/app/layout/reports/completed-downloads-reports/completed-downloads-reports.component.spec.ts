import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedDownloadsReportsComponent } from './completed-downloads-reports.component';

describe('CompletedDownloadsReportsComponent', () => {
  let component: CompletedDownloadsReportsComponent;
  let fixture: ComponentFixture<CompletedDownloadsReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedDownloadsReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedDownloadsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
