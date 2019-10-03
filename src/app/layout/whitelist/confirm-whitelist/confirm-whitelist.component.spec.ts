import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmWhitelistComponent } from './confirm-whitelist.component';

describe('ConfirmWhitelistComponent', () => {
  let component: ConfirmWhitelistComponent;
  let fixture: ComponentFixture<ConfirmWhitelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmWhitelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
