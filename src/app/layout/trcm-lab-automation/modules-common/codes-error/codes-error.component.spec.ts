import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodesErrorComponent } from './codes-error.component';

describe('CodesErrorComponent', () => {
  let component: CodesErrorComponent;
  let fixture: ComponentFixture<CodesErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodesErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodesErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
