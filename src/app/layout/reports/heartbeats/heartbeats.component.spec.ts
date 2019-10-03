import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeartbeatsComponent } from './heartbeats.component';

describe('HeartbeatsComponent', () => {
  let component: HeartbeatsComponent;
  let fixture: ComponentFixture<HeartbeatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeartbeatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeartbeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
