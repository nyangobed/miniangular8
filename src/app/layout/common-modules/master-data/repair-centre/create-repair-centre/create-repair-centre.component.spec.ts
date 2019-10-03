import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRepairCentreComponent } from './create-repair-centre.component';

describe('CreateRepairCentreComponent', () => {
  let component: CreateRepairCentreComponent;
  let fixture: ComponentFixture<CreateRepairCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRepairCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRepairCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
