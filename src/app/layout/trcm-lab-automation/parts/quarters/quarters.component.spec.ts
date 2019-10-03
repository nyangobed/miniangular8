import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartersComponent } from './quarters.component';

describe('QuartersComponent', () => {
  let component: QuartersComponent;
  let fixture: ComponentFixture<QuartersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuartersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
