import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListscheduleComponent } from './listschedule.component';

describe('ListscheduleComponent', () => {
  let component: ListscheduleComponent;
  let fixture: ComponentFixture<ListscheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListscheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListscheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
