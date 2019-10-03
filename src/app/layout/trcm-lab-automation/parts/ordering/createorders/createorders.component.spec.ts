import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateordersComponent } from './createorders.component';

describe('CreateordersComponent', () => {
  let component: CreateordersComponent;
  let fixture: ComponentFixture<CreateordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
