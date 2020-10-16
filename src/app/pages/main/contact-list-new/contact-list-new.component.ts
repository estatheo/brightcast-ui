import { Component, OnInit } from '@angular/core';
import { addListener } from 'process';
import { Contact } from '../../_models/contact';
import { ContactList } from '../../_models/contactList';

@Component({
  selector: 'ngx-contact-list-new',
  templateUrl: './contact-list-new.component.html',
  styleUrls: ['./contact-list-new.component.scss']
})
export class ContactListNewComponent implements OnInit {

  form: number = 0;
  step: number = 0;

  contactList: ContactList = {id: 0, name: '', keyString: '', fileUrl: ''};
  contact: Contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
  contactListTitle: string = '';
  contactListFileUrl: string = '';
  contactName: string = '';
  contactPhone: string = '';
  contactEmail: string = '';

  constructor() { }

  ngOnInit(): void {
    
  }

  saveFormZeroStepZero() {
    this.contactList.name = this.contactListTitle.trim();

    this.step++;
  }
  saveFormZeroStepOne() {

    this.step++;  
  }
  saveFormZeroStepTwo() {
    this.uploadFile();
    this.contactList.fileUrl = this.contactListFileUrl.trim();

    this.addList();

    this.step++;
  }
  saveFormOneStepZero() {
    this.contact.firstName = this.contactName.trim().split(" ")[0];
    this.contact.lastName = this.contactName.trim().split(" ")[1];

    this.step++;    
  }
  saveFormOneStepOne() {
    this.contact.phone = this.contactPhone.trim().replace(" ", "");
    
    this.step++;    
  }
  saveFormOneStepTwo() {
    this.contact.email = this.contactEmail.trim();
    
    this.addContact();

    this.step++;
  }

  switchFormZeroStep(newStep) {
    if ( this.step === 0) {
      this.saveFormZeroStepZero();
    }
    if ( this.step === 1) {
      this.saveFormZeroStepOne();
    }
    if ( this.step === 2) {
      this.saveFormZeroStepTwo();
    }
    this.step = newStep;
  }

  switchFormOneStep(newStep) {
    if ( this.step === 0) {
      this.saveFormOneStepZero();
    }
    if ( this.step === 1) {
      this.saveFormOneStepOne();
    }
    if ( this.step === 2) {
      this.saveFormOneStepTwo();
    }
    
    this.step = newStep;
  }

  uploadFile() {
    this.contactListFileUrl = '?';

  }

  addAnotherContact() {
    
    // create contact

    this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
    this.contactName = '';
    this.contactPhone = '';
    this.contactEmail = '';

    this.form = 1;
    this.step = 0;
  }
  
  addContact() {
    
    // create contact

    this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
    this.contactName = '';
    this.contactPhone = '';
    this.contactEmail = '';

    this.form = 0;
    this.step = 3;
  }

  goToAddContact() {

    this.form = 1;
    this.step = 0;

  }

  addList() {
    
    //create List


  }

  addAnotherList() {

    //create List

    this.contactList = {id: 0, name: '', keyString: '', fileUrl: ''};
    this.contactListTitle = '';
    this.contactListFileUrl = '';

    this.form = 0;
    this.step = 0;
  }

}
