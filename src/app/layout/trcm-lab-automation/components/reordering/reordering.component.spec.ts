import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderingComponent } from './reordering.component';

describe('ReorderingComponent', () => {
  let component: ReorderingComponent;
  let fixture: ComponentFixture<ReorderingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReorderingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
