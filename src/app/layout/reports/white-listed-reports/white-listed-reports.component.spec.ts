import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteListedReportsComponent } from './white-listed-reports.component';

describe('WhiteListedReportsComponent', () => {
  let component: WhiteListedReportsComponent;
  let fixture: ComponentFixture<WhiteListedReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhiteListedReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhiteListedReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
