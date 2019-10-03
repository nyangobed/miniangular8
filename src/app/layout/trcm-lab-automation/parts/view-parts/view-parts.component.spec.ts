import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPartsComponent } from './view-parts.component';

describe('ViewPartsComponent', () => {
  let component: ViewPartsComponent;
  let fixture: ComponentFixture<ViewPartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
