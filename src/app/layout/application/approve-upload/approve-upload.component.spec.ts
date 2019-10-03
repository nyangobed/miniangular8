import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveUploadComponent } from './approve-upload.component';

describe('ApproveUploadComponent', () => {
  let component: ApproveUploadComponent;
  let fixture: ComponentFixture<ApproveUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
