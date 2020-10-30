import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CampaignService } from '../../../@core/apis/campaign.service';
import { ContactService } from '../../../@core/apis/contact.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { Business } from '../../_models/business';
import { CampaignElement } from '../../_models/campaignElement';
import { Contact } from '../../_models/contact';
import { ContactList } from '../../_models/contactList';
import { User } from '../../_models/user';
import { AccountService } from '../../_services';

@Component({
  selector: 'ngx-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.scss']
})
export class CampaignNewComponent implements OnInit {

  step = 0;
  campaignData: CampaignElement = {id: 0, contactListIds: [], response: 0, status: 0, fileUrl: '', message: '', name: '', read: 0, sent: 0};
  contactLists: ContactList[];
  firstContact: Contact;
  title: any = '';
  dateNow = Date.now();
  businessName = '';
  contactListId: any = '0';
  contactListName;
  body: any = '';
  user: User;
  business: Business;
  ready = false;
  image: FormData;
  constructor(
    private router: Router,
    private toastrService: NbToastrService, 
    private contactListService: ContactListService,
    private campaignService: CampaignService,
    private contactService: ContactService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.contactListService.data.subscribe((cl: ContactList[]) => {
      this.contactLists = cl;
      this.ready = true;
      this.accountService.getSettingsData().subscribe(data => {
        this.business = data['business'];
        this.user = data['user'];
      });
    }, error => {
      this.ready = true;
    });
  }

  switchStep(s) {
    if( this.step === 0) {
      this.saveStepZero();
    }
    else if( this.step === 1) {
      this.saveStepOne();
    }
    else if( this.step === 2) {
      this.saveStepTwo();
    }
    this.step = s;
  }

  saveStepZero() {
    this.campaignData.name = this.title.trim();
    this.step++;
  }

  saveStepOne() {
    if(this.campaignData?.contactListIds !== null && this.campaignData?.contactListIds !== undefined && this.campaignData?.contactListIds.length >= 1) {
      this.campaignData.contactListIds[0] = parseInt(this.contactListId);
    }
    else {
      this.campaignData.contactListIds = [parseInt(this.contactListId)];
    }

    this.contactListName = this.contactLists.filter(x => x.id === this.campaignData.contactListIds[0])[0].name;
    this.step++;

    this.contactService.SetContactListId(this.contactListId);
    this.contactService.data.subscribe((contacts : Contact[]) => {
      this.firstContact = contacts[0];
    })
  }

  saveStepTwo() {
    this.campaignData.message = this.body;
    this.step++;
  }

  sendNow() {
    this.campaignService.NewCampaign(this.campaignData).subscribe((c: CampaignElement) => {
      this.campaignService.SendCampaign(c).subscribe(result => {
        this.toastrService.primary('🎉 The campaign has been sent!', 'SENT!');
        this.campaignService.refreshData();
        this.router.navigateByUrl('/pages/main/campaign/' + c.id);
      }, error => {
        //todo: send trace request to server
        this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
      })
      
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    
  }

  savePreview() {
    //status = 0 => created
    this.campaignService.NewCampaign(this.campaignData).subscribe((c: CampaignElement) => {
      this.toastrService.primary('🎉 The campaign has been saved!', 'SAVED!');

      this.router.navigateByUrl('/pages/main/campaign/' + c.id);
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });
  }

  uploadImage(files) {
    if (files.length === 0) {
      return;
    }

    this.image = new FormData();

    for (const file of files) {
      this.image.append(file.name, file);
    }

    if (this.image != null || this.image !== undefined) {
      this.accountService.uploadImage(this.image).subscribe(im => {
        this.campaignData.fileUrl = im['name'];
      });
    }
  }
}
