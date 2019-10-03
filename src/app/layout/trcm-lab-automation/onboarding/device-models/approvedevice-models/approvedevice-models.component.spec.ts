import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedeviceModelsComponent } from './approvedevice-models.component';

describe('ApprovedeviceModelsComponent', () => {
  let component: ApprovedeviceModelsComponent;
  let fixture: ComponentFixture<ApprovedeviceModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedeviceModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedeviceModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
