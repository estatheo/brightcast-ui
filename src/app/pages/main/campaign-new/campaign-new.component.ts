import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { CampaignService } from '../../../@core/apis/campaign.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { CampaignData } from '../../_models/campaignData';
import { CampaignElement } from '../../_models/campaignElement';
import { ContactList } from '../../_models/contactList';
import { NewCampaign } from '../../_models/newCampaign';
import { CampaignEditComponent } from '../campaign-edit/campaign-edit.component';

@Component({
  selector: 'ngx-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.scss']
})
export class CampaignNewComponent implements OnInit {

  step = 0;
  campaignData: CampaignElement = {id: 0, contactListIds: [], response: 0, status: 0, fileUrl: '', message: '', name: '', read: 0, sent: 0};
  contactLists: ContactList[];
  title: any = '';
  contactListId: any = '0';
  contactListName;
  body: any = '';
  ready = false;
  constructor(
    private router: Router,
    private toastrService: NbToastrService,
    private contactListService: ContactListService,
    private campaignService: CampaignService
  ) { }

  ngOnInit(): void {
    this.contactListService.data.subscribe((cl: ContactList[]) => {
      this.contactLists = cl;
      this.ready = true;
    })
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

    this.contactListName = this.contactLists.filter(x => x.id === this.campaignData.contactListIds[0]);
    this.step++;
  }

  saveStepTwo() {
    this.campaignData.message = this.body;
    this.step++;
  }

  sendNow() {
    this.campaignService.NewCampaign(this.campaignData).subscribe((c: CampaignElement) => {
      this.campaignService.SendCampaign(c).subscribe(result => {
        this.toastrService.primary('🎉 The campaign has been sent!', 'SENT!');

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
}
