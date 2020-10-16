import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { ContactListElement } from '../../_models/contactListElement';
import { Router } from '@angular/router';
import { ContactService } from '../../../@core/apis/contact.service';
import { Contact } from '../../_models/contact';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent implements OnInit {

  data: ContactListElement[];
  contactList = { name: 'Accounting'};
  contacts: Contact[] = [{contactListId: 1, email: 'test@gmail.com', firstName: 'theo', lastName: 'bogdan',subscribed: 'true', phone: '+44 7843753547', id: 1}]
  selectedItem = "0";
  constructor(
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private router: Router,
    private contactListService: ContactListService,
    private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactListService.data.subscribe((data: ContactListElement[]) => {
      this.data = data;
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
    
  }

  openModal() {
    
  }
}
