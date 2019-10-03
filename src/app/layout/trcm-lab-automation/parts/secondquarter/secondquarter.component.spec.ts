import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondquarterComponent } from './secondquarter.component';

describe('SecondquarterComponent', () => {
  let component: SecondquarterComponent;
  let fixture: ComponentFixture<SecondquarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondquarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
