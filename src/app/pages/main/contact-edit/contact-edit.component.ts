import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ContactService } from '../../../@core/apis/contact.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { Contact } from '../../_models/contact';
import { ContactList } from '../../_models/contactList';

@Component({
  selector: 'ngx-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  routeSub: Subscription;
  step: number = 0;
  contactListId: number;
  contactId: number;
  contactList: ContactList = {id: 0, fileUrl: '', name: '', keyString: ''};
  contact: Contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
  contactName: string = '';
  contactPhone: string = '';
  contactEmail: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService,
    private contactListService: ContactListService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.contactListId = p['contactListId'];
      this.contactId = p['id'];
      this.contactListService.GetContactList(this.contactListId).subscribe((cl: ContactList) => {
        this.contactList = cl;
        this.contactService.GetContact(this.contactId).subscribe((c: Contact) => {
          this.contact = c;
        });
      });
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
  
  editContact() {    
    this.contactService.Update(this.contact).subscribe(() => {
      this.toastrService.primary('🎉 The contact has been updated!', 'UPDATED!');
      this.contact = {id: 0, contactListId: 0, firstName: '', lastName: '', email: '', phone: '', subscribed: 'true'};
      this.contactName = '';
      this.contactPhone = '';
      this.contactEmail = '';
  
      this.router.navigateByUrl('/pages/main/customer-list/' + this.contactListId);
    }, error => {

      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });    
  }

}
