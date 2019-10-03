import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedeviceModelsComponent } from './createdevice-models.component';

describe('CreatedeviceModelsComponent', () => {
  let component: CreatedeviceModelsComponent;
  let fixture: ComponentFixture<CreatedeviceModelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedeviceModelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedeviceModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
