import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsrequsitionComponent } from './partsrequsition.component';

describe('PartsrequsitionComponent', () => {
  let component: PartsrequsitionComponent;
  let fixture: ComponentFixture<PartsrequsitionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsrequsitionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsrequsitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
