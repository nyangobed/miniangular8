import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetwarrantyComponent } from './setwarranty.component';

describe('SetwarrantyComponent', () => {
  let component: SetwarrantyComponent;
  let fixture: ComponentFixture<SetwarrantyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetwarrantyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetwarrantyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
