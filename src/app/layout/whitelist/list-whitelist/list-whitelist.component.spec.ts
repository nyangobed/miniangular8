import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWhitelistComponent } from './list-whitelist.component';

describe('ListWhitelistComponent', () => {
  let component: ListWhitelistComponent;
  let fixture: ComponentFixture<ListWhitelistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWhitelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWhitelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
