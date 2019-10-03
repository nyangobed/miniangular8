import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewtelcomsComponent } from './viewtelcoms.component';

describe('ViewtelcomsComponent', () => {
  let component: ViewtelcomsComponent;
  let fixture: ComponentFixture<ViewtelcomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewtelcomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtelcomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
