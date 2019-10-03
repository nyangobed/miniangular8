import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepartsIssuedComponent } from './createparts-issued.component';

describe('CreatepartsIssuedComponent', () => {
  let component: CreatepartsIssuedComponent;
  let fixture: ComponentFixture<CreatepartsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepartsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepartsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
