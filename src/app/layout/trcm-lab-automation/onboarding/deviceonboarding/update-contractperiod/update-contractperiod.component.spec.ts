import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractperiodComponent } from './update-contractperiod.component';

describe('UpdateContractperiodComponent', () => {
  let component: UpdateContractperiodComponent;
  let fixture: ComponentFixture<UpdateContractperiodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContractperiodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContractperiodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
