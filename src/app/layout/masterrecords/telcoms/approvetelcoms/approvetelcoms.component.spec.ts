import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovetelcomsComponent } from './approvetelcoms.component';

describe('ApprovetelcomsComponent', () => {
  let component: ApprovetelcomsComponent;
  let fixture: ComponentFixture<ApprovetelcomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovetelcomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovetelcomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
