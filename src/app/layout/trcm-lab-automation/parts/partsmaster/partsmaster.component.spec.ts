import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartsmasterComponent } from './partsmaster.component';

describe('PartsmasterComponent', () => {
  let component: PartsmasterComponent;
  let fixture: ComponentFixture<PartsmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartsmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartsmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
