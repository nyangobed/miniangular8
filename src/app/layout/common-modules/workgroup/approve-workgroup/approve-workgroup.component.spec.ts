import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveWorkgroupComponent } from './approve-workgroup.component';

describe('ApproveWorkgroupComponent', () => {
  let component: ApproveWorkgroupComponent;
  let fixture: ComponentFixture<ApproveWorkgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveWorkgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
