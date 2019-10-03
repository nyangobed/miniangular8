import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsOnboardingComponent } from './tools-onboarding.component';

describe('ToolsOnboardingComponent', () => {
  let component: ToolsOnboardingComponent;
  let fixture: ComponentFixture<ToolsOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
