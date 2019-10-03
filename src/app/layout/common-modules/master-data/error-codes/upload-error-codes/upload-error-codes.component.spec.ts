import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadErrorCodesComponent } from './upload-error-codes.component';

describe('UploadErrorCodesComponent', () => {
  let component: UploadErrorCodesComponent;
  let fixture: ComponentFixture<UploadErrorCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadErrorCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadErrorCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
