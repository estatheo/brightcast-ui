import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { ContactList } from '../../_models/contactList';

@Component({
  selector: 'ngx-contact-list-edit',
  templateUrl: './contact-list-edit.component.html',
  styleUrls: ['./contact-list-edit.component.scss']
})
export class ContactListEditComponent implements OnInit {

  routeSub: Subscription;
  step: number = 0;  
  contactListId: number;
  contactList: ContactList = {id: 0, name: '', keyString: '', fileUrl: ''};
  contactListTitle: string = '';
  contactListFileUrl: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private toastrService: NbToastrService,
    private contactListService: ContactListService
    ) { }

  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.contactListId = p['id'];
      this.contactListService.GetContactList(this.contactListId).subscribe((cl: ContactList) => {
        this.contactList = cl;
      });
    });
  }

  saveStepZero() {
    if(this.contactListTitle !== null && this.contactListTitle !== undefined && this.contactListTitle !== ''){
      this.contactList.name = this.contactListTitle.trim();
    }

    this.step++;
  }
  saveStepOne() {

    this.step++;  
  }

  saveStepTwo() {
    this.uploadFile();
    if(this.contactListFileUrl !== null && this.contactListFileUrl !== undefined && this.contactListFileUrl !== ''){
      this.contactList.fileUrl = this.contactListFileUrl.trim();
    }

    this.editList();

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

  uploadFile() {
    this.contactListFileUrl = '?';

  }

  editList() {
    this.contactListService.Update(this.contactList).subscribe(() => {
      this.toastrService.primary('🎉 The contact list has been updated!', 'UPDATED!');
      this.contactList = {id: 0, name: '', keyString: '', fileUrl: ''};
      this.contactListTitle = '';
      this.contactListFileUrl = '';
  
      this.step++;
    }, error => {

      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });
  }
}
