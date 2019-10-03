import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeviceDialogComponent } from './edit-device-dialog.component';

describe('EditDeviceDialogComponent', () => {
  let component: EditDeviceDialogComponent<any>;
  let fixture: ComponentFixture<EditDeviceDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDeviceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDeviceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
