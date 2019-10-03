import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatetelcomsComponent } from './createtelcoms.component';

describe('CreatetelcomsComponent', () => {
  let component: CreatetelcomsComponent;
  let fixture: ComponentFixture<CreatetelcomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatetelcomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatetelcomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
