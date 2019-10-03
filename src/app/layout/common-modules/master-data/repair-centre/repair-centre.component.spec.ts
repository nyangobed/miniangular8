import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairCentreComponent } from './repair-centre.component';

describe('RepairCentreComponent', () => {
  let component: RepairCentreComponent;
  let fixture: ComponentFixture<RepairCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
