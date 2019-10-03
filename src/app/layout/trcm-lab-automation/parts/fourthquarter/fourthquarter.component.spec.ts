import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourthquarterComponent } from './fourthquarter.component';

describe('FourthquarterComponent', () => {
  let component: FourthquarterComponent;
  let fixture: ComponentFixture<FourthquarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourthquarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourthquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
