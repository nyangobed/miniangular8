import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedordersComponent } from './receivedorders.component';

describe('ReceivedordersComponent', () => {
  let component: ReceivedordersComponent;
  let fixture: ComponentFixture<ReceivedordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
