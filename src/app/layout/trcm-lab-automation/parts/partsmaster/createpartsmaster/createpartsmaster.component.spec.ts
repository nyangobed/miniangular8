import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatepartsmasterComponent } from './createpartsmaster.component';

describe('CreatepartsmasterComponent', () => {
  let component: CreatepartsmasterComponent;
  let fixture: ComponentFixture<CreatepartsmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatepartsmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatepartsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
