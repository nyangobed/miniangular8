import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdquarterComponent } from './thirdquarter.component';

describe('ThirdquarterComponent', () => {
  let component: ThirdquarterComponent;
  let fixture: ComponentFixture<ThirdquarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdquarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdquarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
