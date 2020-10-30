import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCanceledComponent } from './checkout-canceled.component';

describe('CheckoutCanceledComponent', () => {
  let component: CheckoutCanceledComponent;
  let fixture: ComponentFixture<CheckoutCanceledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutCanceledComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCanceledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
