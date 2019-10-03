import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsHistoryComponent } from './parts-history.component';

describe('PartsHistoryComponent', () => {
  let component: PartsHistoryComponent;
  let fixture: ComponentFixture<PartsHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
