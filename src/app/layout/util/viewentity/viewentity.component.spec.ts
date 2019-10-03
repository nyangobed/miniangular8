import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewentityComponent } from './viewentity.component';

describe('ViewentityComponent', () => {
  let component: ViewentityComponent;
  let fixture: ComponentFixture<ViewentityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewentityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
