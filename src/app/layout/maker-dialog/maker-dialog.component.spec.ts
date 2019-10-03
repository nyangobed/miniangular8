import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerDialogComponent } from './maker-dialog.component';

describe('MakerDialogComponent', () => {
  let component: MakerDialogComponent<any>;
  let fixture: ComponentFixture<MakerDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
