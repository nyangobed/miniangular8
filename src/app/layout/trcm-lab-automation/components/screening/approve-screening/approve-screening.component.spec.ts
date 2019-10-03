import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveScreeningComponent } from './approve-screening.component';

describe('ApproveScreeningComponent', () => {
  let component: ApproveScreeningComponent;
  let fixture: ComponentFixture<ApproveScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
