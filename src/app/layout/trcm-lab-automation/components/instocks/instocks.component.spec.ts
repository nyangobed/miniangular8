import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstocksComponent } from './instocks.component';

describe('InstocksComponent', () => {
  let component: InstocksComponent;
  let fixture: ComponentFixture<InstocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
