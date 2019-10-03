import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SentordersComponent } from './sentorders.component';

describe('SentordersComponent', () => {
  let component: SentordersComponent;
  let fixture: ComponentFixture<SentordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SentordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SentordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
