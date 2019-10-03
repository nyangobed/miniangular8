import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScreeningComponent } from './view-screening.component';

describe('ViewScreeningComponent', () => {
  let component: ViewScreeningComponent;
  let fixture: ComponentFixture<ViewScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
