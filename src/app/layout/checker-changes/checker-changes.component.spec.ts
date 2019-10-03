import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckerChangesComponent } from './checker-changes.component';

describe('CheckerChangesComponent', () => {
  let component: CheckerChangesComponent;
  let fixture: ComponentFixture<CheckerChangesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckerChangesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckerChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
