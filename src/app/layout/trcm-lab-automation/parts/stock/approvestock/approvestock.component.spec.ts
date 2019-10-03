import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovestockComponent } from './approvestock.component';

describe('ApprovestockComponent', () => {
  let component: ApprovestockComponent;
  let fixture: ComponentFixture<ApprovestockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovestockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovestockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
