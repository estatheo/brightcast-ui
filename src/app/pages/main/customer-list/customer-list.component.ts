import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { ContactListElement } from '../../_models/contactListElement';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../../@core/apis/contact.service';
import { Contact } from '../../_models/contact';
import { ContactList } from '../../_models/contactList';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  data: ContactListElement[];
  shareLink: string;  
  contactList: ContactList;
  contactListId: number;
  routeSub: Subscription;
  contacts: Contact[];
  selectedItem = "0";
  constructor(
    private route: ActivatedRoute,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private router: Router,
    private contactListService: ContactListService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.contactListId = p['id'];
      this.contactListService.GetContactList(this.contactListId).subscribe((data: ContactList) => {
        this.contactList = data;
        this.shareLink = location.protocol + '//' + location.host + '/signup_contact/' + this.contactList.keyString;  
        this.contactService.SetContactListId(this.contactListId);
        this.contactService.refreshData();
        this.contactService.data.subscribe((data: Contact[]) => {
          this.contacts = data;
        });    
      });
    });
  }

  delete(id) {
    this.contactListService.Delete(id).subscribe(() => {
      this.toastrService.primary('❌ The Contact List has been deleted!', 'Deleted!');
      this.contactListService.refreshData();
      this.contactService.refreshData();
      this.contactListService.data.subscribe((data: ContactListElement[]) => {
        this.data = data;
        this.router.navigate(['pages/main/customer-list']);
      });
    }, error => {
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });
  }

  updateTimeFilter(){}

  editContact(id) {

  }

  deleteContact(id) {
    this.contactService.Delete(id).subscribe(() => {
      this.toastrService.primary('🎇 The Contact has been deleted!', 'Deleted!');
      this.contactService.refreshData();
      this.contactService.data.subscribe((data: Contact[]) => {
        this.contacts = data;
        // this.router.navigate(['pages/main/customer-list/' + this.contactListId]);
      });
    }, error => {
      this.toastrService.danger('❌ There was an error processing the request!', 'Error!');
    });
  }

  copyLink() {
    this.toastrService.warning('The Link was copied to clipboard!', 'Note');
  }
}
