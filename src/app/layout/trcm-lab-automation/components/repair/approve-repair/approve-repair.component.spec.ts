import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRepairComponent } from './approve-repair.component';

describe('ApproveRepairComponent', () => {
  let component: ApproveRepairComponent;
  let fixture: ComponentFixture<ApproveRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
