import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkgroupComponent } from './create-workgroup.component';

describe('CreateWorkgroupComponent', () => {
  let component: CreateWorkgroupComponent;
  let fixture: ComponentFixture<CreateWorkgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
