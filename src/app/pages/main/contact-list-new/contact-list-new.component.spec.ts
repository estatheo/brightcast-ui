import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListNewComponent } from './contact-list-new.component';

describe('ContactListNewComponent', () => {
  let component: ContactListNewComponent;
  let fixture: ComponentFixture<ContactListNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactListNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactListNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
