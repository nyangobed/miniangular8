import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosparamComponent } from './posparam.component';

describe('PosparamComponent', () => {
  let component: PosparamComponent;
  let fixture: ComponentFixture<PosparamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosparamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
