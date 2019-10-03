import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufactureronboardingComponent } from './manufactureronboarding.component';

describe('ManufactureronboardingComponent', () => {
  let component: ManufactureronboardingComponent;
  let fixture: ComponentFixture<ManufactureronboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufactureronboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufactureronboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
