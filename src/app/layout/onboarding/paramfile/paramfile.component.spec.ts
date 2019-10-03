import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamfileComponent } from './paramfile.component';

describe('ParamfileComponent', () => {
  let component: ParamfileComponent;
  let fixture: ComponentFixture<ParamfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
