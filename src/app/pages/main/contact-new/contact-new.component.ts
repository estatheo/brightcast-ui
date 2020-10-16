import { Component, OnInit } from '@angular/core';
import { Contact } from '../../_models/contact';

@Component({
  selector: 'ngx-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss']
})
export class ContactNewComponent implements OnInit {

  step: number = 0;
  contactListTitle = 'Test Title';
  contact: Contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
  contactName: string = '';
  contactPhone: string = '';
  contactEmail: string = '';

  constructor() { }

  ngOnInit(): void {
  }
  
  saveStepZero() {
    this.contact.firstName = this.contactName.trim().split(" ")[0];
    this.contact.lastName = this.contactName.trim().split(" ")[1];

    this.step++;    
  }
  saveStepOne() {
    this.contact.phone = this.contactPhone.trim().replace(" ", "");
    
    this.step++;    
  }
  saveStepTwo() {
    this.contact.email = this.contactEmail.trim();
    
    this.addContact();

    this.step++;
  }
  
  switchStep(newStep) {
    if ( this.step === 0) {
      this.saveStepZero();
    }
    if ( this.step === 1) {
      this.saveStepOne();
    }
    if ( this.step === 2) {
      this.saveStepTwo();
    }
    
    this.step = newStep;
  }
  addAnotherContact() {
    
    // create contact

    this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
    this.contactName = '';
    this.contactPhone = '';
    this.contactEmail = '';

    this.step = 0;
  }
  
  addContact() {
    
    // create contact

    this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
    this.contactName = '';
    this.contactPhone = '';
    this.contactEmail = '';

    //route to contactList
  }

}
