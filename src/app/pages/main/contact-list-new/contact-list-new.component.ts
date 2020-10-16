import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { addListener } from 'process';
import { ContactService } from '../../../@core/apis/contact.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
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
  contact: Contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
  contactListTitle: string = '';
  contactListFileUrl: string = '';
  contactName: string = '';
  contactPhone: string = '';
  contactEmail: string = '';

  constructor(
    private toastrService: NbToastrService,
    private contactListService: ContactListService,
    private contactService: ContactService
  ) { }

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
    
    this.contactService.NewContact(this.contact).subscribe((c: Contact) => {
      this.contact.id = c.id;
      this.toastrService.primary('🎉 The Contact has been created!', 'CREATED!');
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
    this.contactName = '';
    this.contactPhone = '';
    this.contactEmail = '';

    this.form = 1;
    this.step = 0;
  }
  
  addContact() {
    
    this.contactService.NewContact(this.contact).subscribe((c: Contact) => {
      this.contact.id = c.id;
      this.toastrService.primary('🎉 The Contact has been created!', 'CREATED!');
      this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
      this.contactName = '';
      this.contactPhone = '';
      this.contactEmail = '';

      this.form = 0;
      this.step = 3;
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    
  }

  goToAddContact() {

    this.form = 1;
    this.step = 0;

  }

  addList() {
    
    this.contactListService.NewContactList(this.contactList).subscribe((cl: ContactList) => {
      this.contactList.id = cl.id;
      this.toastrService.primary('🎉 The Contact list has been created!', 'CREATED!');
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });


  }

  addAnotherList() {

    this.contactListService.NewContactList(this.contactList).subscribe((cl: ContactList) => {
      this.contactList.id = cl.id;
      this.toastrService.primary('🎉 The Contact list has been created!', 'CREATED!');

      this.contactList = {id: 0, name: '', keyString: '', fileUrl: ''};
      this.contactListTitle = '';
      this.contactListFileUrl = '';

      this.form = 0;
      this.step = 0;
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    
  }

}
