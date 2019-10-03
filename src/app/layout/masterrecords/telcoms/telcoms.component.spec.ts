import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelcomsComponent } from './telcoms.component';

describe('TelcomsComponent', () => {
  let component: TelcomsComponent;
  let fixture: ComponentFixture<TelcomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelcomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelcomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
