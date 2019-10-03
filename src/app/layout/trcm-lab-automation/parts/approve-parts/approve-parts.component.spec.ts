import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovePartsComponent } from './approve-parts.component';

describe('ApprovePartsComponent', () => {
  let component: ApprovePartsComponent;
  let fixture: ComponentFixture<ApprovePartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovePartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovePartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
