import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveproductComponent } from './approveproduct.component';

describe('ApproveproductComponent', () => {
  let component: ApproveproductComponent;
  let fixture: ComponentFixture<ApproveproductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveproductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
