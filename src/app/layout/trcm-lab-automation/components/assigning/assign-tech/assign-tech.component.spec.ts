import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTechComponent } from './assign-tech.component';

describe('AssignTechComponent', () => {
  let component: AssignTechComponent;
  let fixture: ComponentFixture<AssignTechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignTechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
