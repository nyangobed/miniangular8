import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHierachyComponent } from './organization-hierachy.component';

describe('OrganizationHierachyComponent', () => {
  let component: OrganizationHierachyComponent;
  let fixture: ComponentFixture<OrganizationHierachyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHierachyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHierachyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
