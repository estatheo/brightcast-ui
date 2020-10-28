import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { addListener } from 'process';
import { ContactService } from '../../../@core/apis/contact.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { Contact } from '../../_models/contact';
import { ContactList } from '../../_models/contactList';
import { AccountService } from '../../_services';

@Component({
  selector: 'ngx-contact-list-new',
  templateUrl: './contact-list-new.component.html',
  styleUrls: ['./contact-list-new.component.scss']
})
export class ContactListNewComponent implements OnInit {

  form: number = 0;
  step: number = 0;
  doc: FormData;
  contactList: ContactList = {id: 0, name: '', keyString: '', fileUrl: ''};
  contact: Contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
  contactListTitle: string = 'Marketing Prospects';
  contactListFileUrl: string = '';
  contactName: string = 'Jane Doe';
  contactPhone: string = '+447773335555';
  contactEmail: string = 'hello@brightcast.io';

  constructor(
    private toastrService: NbToastrService,
    private contactListService: ContactListService,
    private contactService: ContactService,
    private accountService: AccountService
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

  uploadFile(files) {

    if (files.length === 0) {
      return;
    }

    this.doc = new FormData();

    for (const file of files) {
      this.doc.append(file.name, file);
      this.accountService.uploadDoc(this.doc).subscribe(im => {
        this.contactListFileUrl = im['name'];
      });
    }
  }

  addAnotherContact() {
    this.saveFormOneStepTwo();
    if (this.contactList.id === 0) {
      this.contactListService.NewContactList(this.contactList).subscribe((cl: ContactList) => {
        this.contactList.id = cl.id;
        this.contact.contactListId = this.contactList.id;
        this.contactService.NewContact(this.contact).subscribe((c: Contact) => {

          this.contact.id = c.id;          
          this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
          this.contactName = '';
          this.contactPhone = '';
          this.contactEmail = '';
      
          this.form = 1;
          this.step = 0;    

          this.toastrService.primary('🎉 The Contact has been created!', 'CREATED!');
        }, error => {
          //todo: send trace request to server
          this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
        });
    
        
      }, error => {
        //todo: send trace request to server
        this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
      });
    } else {
      this.contact.contactListId = this.contactList.id;
      this.contactService.NewContact(this.contact).subscribe((c: Contact) => {

        this.contact.id = c.id;
        this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
        this.contactName = '';
        this.contactPhone = '';
        this.contactEmail = '';
    
        this.form = 1;
        this.step = 0;      
        this.toastrService.primary('🎉 The Contact has been created!', 'CREATED!');
      }, error => {
        //todo: send trace request to server
        this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
      });
  
    }    
  }
  
  addContact() {  
    this.saveFormOneStepTwo();
    if(this.contactList.id === 0 ) {
      this.contactListService.NewContactList(this.contactList).subscribe((cl: ContactList) => {
        this.contactList.id = cl.id;
        this.contact.contactListId = this.contactList.id;
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
      });
    } else {
      this.contact.contactListId = this.contactList.id;
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
