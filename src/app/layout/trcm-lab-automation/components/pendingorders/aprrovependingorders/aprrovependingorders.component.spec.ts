import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AprrovependingordersComponent } from './aprrovependingorders.component';

describe('AprrovependingordersComponent', () => {
  let component: AprrovependingordersComponent;
  let fixture: ComponentFixture<AprrovependingordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AprrovependingordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AprrovependingordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
