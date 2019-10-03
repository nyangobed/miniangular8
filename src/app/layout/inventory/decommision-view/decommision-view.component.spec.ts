import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecommisionViewComponent } from './decommision-view.component';

describe('DecommisionViewComponent', () => {
  let component: DecommisionViewComponent;
  let fixture: ComponentFixture<DecommisionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecommisionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecommisionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
