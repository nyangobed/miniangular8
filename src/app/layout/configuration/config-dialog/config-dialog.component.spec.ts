import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigDialogComponent } from './config-dialog.component';

describe('ConfigDialogComponent', () => {
  let component: ConfigDialogComponent<any>;
  let fixture: ComponentFixture<ConfigDialogComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
