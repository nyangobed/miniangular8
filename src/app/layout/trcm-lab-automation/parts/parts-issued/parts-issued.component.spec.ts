import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsIssuedComponent } from './parts-issued.component';

describe('PartsIssuedComponent', () => {
  let component: PartsIssuedComponent;
  let fixture: ComponentFixture<PartsIssuedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsIssuedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsIssuedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
