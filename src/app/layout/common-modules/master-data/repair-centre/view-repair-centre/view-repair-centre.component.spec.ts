import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepairCentreComponent } from './view-repair-centre.component';

describe('ViewRepairCentreComponent', () => {
  let component: ViewRepairCentreComponent;
  let fixture: ComponentFixture<ViewRepairCentreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRepairCentreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRepairCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
