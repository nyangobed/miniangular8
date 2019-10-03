import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatebusinessunitComponent } from './createbusinessunit.component';
import { FormsModule } from '@angular/forms';

describe('CreatebusinessunitComponent', () => {
  let component: CreatebusinessunitComponent;
  let fixture: ComponentFixture<CreatebusinessunitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatebusinessunitComponent ],
      imports: [ReactiveFormsModule,FormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatebusinessunitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
