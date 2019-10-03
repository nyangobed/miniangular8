import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfigsComponent } from './update-configs.component';

describe('UpdateConfigsComponent', () => {
  let component: UpdateConfigsComponent;
  let fixture: ComponentFixture<UpdateConfigsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConfigsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConfigsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
