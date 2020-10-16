import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignData } from '../../_models/campaignData';
import { NewCampaign } from '../../_models/newCampaign';

@Component({
  selector: 'ngx-campaign-new',
  templateUrl: './campaign-new.component.html',
  styleUrls: ['./campaign-new.component.scss']
})
export class CampaignNewComponent implements OnInit {

  step = 0;
  campaignData: NewCampaign = {body: 'Creating Remarkable Poster Prints Through 4 Color Poster Printing Creating Remarkable Poster Prints Through 4 Color Poster PrintingCreating Remarkable Poster Prints Through 4 Color Poster Printing', contactListId: 0, file: '', title: ''};
  title: any = '';
  contactListId: any = '0';
  body: any = '';
  constructor() { }

  ngOnInit(): void {
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
    this.campaignData.title = this.title.trim();
    this.step++;
  }

  saveStepOne() {
    this.campaignData.contactListId = parseInt(this.contactListId);
    this.step++;
  }

  saveStepTwo() {
    this.campaignData.body = this.body;
    this.step++;
  }

  sendNow() {

  }

  savePreview() {
    
  }
}
