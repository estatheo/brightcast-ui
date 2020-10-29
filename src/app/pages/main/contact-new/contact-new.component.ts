import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ContactService } from '../../../@core/apis/contact.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { Contact } from '../../_models/contact';
import { ContactList } from '../../_models/contactList';

@Component({
  selector: 'ngx-contact-new',
  templateUrl: './contact-new.component.html',
  styleUrls: ['./contact-new.component.scss']
})
export class ContactNewComponent implements OnInit {

  routeSub: Subscription;
  step: number = 0;
  contactListTitle: string;
  contact: Contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
  contactName: string = 'Jane Doe';
  contactPhone: string = '+447773335555';
  contactEmail: string = 'hello@brightcast.io';
  contactListId: number;

  constructor(
    private toastrService: NbToastrService,
    private contactService: ContactService,
    private contactListService: ContactListService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.contactListId = p['id'];
      this.contactListService.GetContactList(this.contactListId).subscribe((cl: ContactList) => {
        this.contactListTitle = cl.name;
        this.contact.contactListId = cl.id;
      })
    });

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
    this.step++;
  }
  
  switchStep(newStep) {
    if ( this.step === 0) {
      this.saveStepZero();
    }
    else if ( this.step === 1) {
      this.saveStepOne();
    }
    else if ( this.step === 2) {
      this.saveStepTwo();
    }
    
    this.step = newStep;
  }
  addAnotherContact() {
    this.contactService.NewContact(this.contact).subscribe((c: Contact) => {
      this.contact.id = c.id;
      this.toastrService.primary('🎉 The Contact has been created!', 'CREATED!');

      this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
      this.contactName = '';
      this.contactPhone = '';
      this.contactEmail = '';

      this.step = 0;
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    
  }
  
  addContact() {
    this.saveStepTwo();
    this.contactService.NewContact(this.contact).subscribe((c: Contact) => {
      this.contact.id = c.id;
      this.toastrService.primary('🎉 The Contact has been created!', 'CREATED!');

      this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: true};
      this.contactName = '';
      this.contactPhone = '';
      this.contactEmail = '';

      this.router.navigateByUrl('pages/main/customer-list/' + this.contactListId);
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    
  }

}
