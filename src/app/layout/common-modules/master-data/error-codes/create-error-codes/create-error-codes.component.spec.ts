import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateErrorCodesComponent } from './create-error-codes.component';

describe('CreateErrorCodesComponent', () => {
  let component: CreateErrorCodesComponent;
  let fixture: ComponentFixture<CreateErrorCodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateErrorCodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateErrorCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
