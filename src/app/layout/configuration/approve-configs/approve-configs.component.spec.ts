import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveConfigsComponent } from './approve-configs.component';

describe('ApproveConfigsComponent', () => {
  let component: ApproveConfigsComponent;
  let fixture: ComponentFixture<ApproveConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
