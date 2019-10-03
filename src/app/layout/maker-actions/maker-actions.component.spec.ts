import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakerActionsComponent } from './maker-actions.component';

describe('MakerActionsComponent', () => {
  let component: MakerActionsComponent<any>;
  let fixture: ComponentFixture<MakerActionsComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakerActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
