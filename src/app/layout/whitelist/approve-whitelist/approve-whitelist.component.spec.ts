import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWhitelistComponent } from './approve-whitelist.component';

describe('ApproveWhitelistComponent', () => {
  let component: ApproveWhitelistComponent;
  let fixture: ComponentFixture<ApproveWhitelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveWhitelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
