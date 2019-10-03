import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRepairCentreComponent } from './approve-repair-centre.component';

describe('ApproveRepairCentreComponent', () => {
  let component: ApproveRepairCentreComponent;
  let fixture: ComponentFixture<ApproveRepairCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRepairCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRepairCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
