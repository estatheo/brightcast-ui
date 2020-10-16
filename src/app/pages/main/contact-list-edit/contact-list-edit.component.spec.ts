import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListEditComponent } from './contact-list-edit.component';

describe('ContactListEditComponent', () => {
  let component: ContactListEditComponent;
  let fixture: ComponentFixture<ContactListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
