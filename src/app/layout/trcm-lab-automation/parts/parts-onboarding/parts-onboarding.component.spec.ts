import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsOnboardingComponent } from './parts-onboarding.component';

describe('PartsOnboardingComponent', () => {
  let component: PartsOnboardingComponent;
  let fixture: ComponentFixture<PartsOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
