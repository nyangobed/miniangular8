import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBatchfilesComponent } from './list-batchfiles.component';

describe('ListBatchfilesComponent', () => {
  let component: ListBatchfilesComponent;
  let fixture: ComponentFixture<ListBatchfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBatchfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBatchfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
