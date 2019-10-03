import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssigningComponent } from './view-assigning.component';

describe('ViewAssigningComponent', () => {
  let component: ViewAssigningComponent;
  let fixture: ComponentFixture<ViewAssigningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAssigningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAssigningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
