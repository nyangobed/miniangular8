import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovecurrencyComponent } from './approvecurrency.component';

describe('ApprovecurrencyComponent', () => {
  let component: ApprovecurrencyComponent;
  let fixture: ComponentFixture<ApprovecurrencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovecurrencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovecurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
