import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingmanualComponent } from './pendingmanual.component';

describe('PendingmanualComponent', () => {
  let component: PendingmanualComponent;
  let fixture: ComponentFixture<PendingmanualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingmanualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingmanualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
