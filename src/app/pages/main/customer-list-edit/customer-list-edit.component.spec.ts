import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListEditComponent } from './customer-list-edit.component';

describe('CustomerListEditComponent', () => {
  let component: CustomerListEditComponent;
  let fixture: ComponentFixture<CustomerListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
