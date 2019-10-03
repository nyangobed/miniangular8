import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewErrorCodesComponent } from './view-error-codes.component';

describe('ViewErrorCodesComponent', () => {
  let component: ViewErrorCodesComponent;
  let fixture: ComponentFixture<ViewErrorCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewErrorCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewErrorCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
