import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManufacturersComponent } from './create-manufacturers.component';

describe('CreateManufacturersComponent', () => {
  let component: CreateManufacturersComponent;
  let fixture: ComponentFixture<CreateManufacturersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateManufacturersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManufacturersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
