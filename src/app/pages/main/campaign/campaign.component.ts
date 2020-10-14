import { Component, OnInit } from '@angular/core';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignService} from '../../../@core/apis/campaign.service';
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { CampaignData } from '../../_models/campaignData';
import { CampaignElement } from '../../_models/campaignElement';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Campaign } from '../../_models/campaign';
import { Contact } from '../../_models/contact';
import { ContactPreview } from '../../_models/contactPreview';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatMessage } from '../../_models/chat';

@Component({
  selector: 'ngx-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private campaignsService: CampaignService) { }
  loading = false;
  dataReady = false;
  isAnalytics = false;
  contacts: ContactPreview[] = [{firstName: 'Theo', lastName: 'Chichirita', body: 'This is a message for', time: new Date(), id: 1},{firstName: 'Theo', lastName: 'Chichirita', body: 'This is a message for', time: new Date(), id: 2}];
  messages: ChatMessage[]  = [{id: 1, text: 'hi', reply: false},{id: 2, text: 'hi', reply: true}, {id: 1, text: 'hi', reply: false},{id: 2, text: 'hi', reply: true}];
  data: any;
  selectedContactId = 0;
  selectedChart = 'delivered';
  btnstatus = ['outline', 'hero'];
  settingClass = ['personal', 'business'];
  selectedItem = "0";
  campaignId: number;
  routeSub: Subscription;
  campaign: Campaign = { name: "Campaign One", response: 2, status: 1, contactListIds: [], delivered: 1000, read: 15000, subscribed: 1230, replies: 1231, deliveredPercentage: 12, readPercentage: -0.5, subscribedPercentage: -15, repliesPercentage: 23};
  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.campaignId = p['id'];
      this.selectedContactId = this.contacts[0].id;
      this.dataReady = true;
      this.campaignsService.GetCampaignData(this.campaignId).subscribe((data: Campaign) => {
        this.campaign = data;
      });
    });
    
  }

  openModal() {
    this.windowService.open(
      CampaignNewComponent,
      { title: 'New Campaign', context: { contactListList: this.data.contactLists} });
  }

  openModalForEdit(event) {
    this.campaignsService.data.subscribe((data: CampaignData) => {
      this.data = data;
      this.windowService.open(
        CampaignFormComponent,
        { title: 'Edit Campaign', context: { contactListList: this.data.contactLists, campaign: event } });
    });

  }

  delete(id) {
    this.campaignsService.Delete(id).subscribe(() => {
      this.toastrService.primary('❌ The campaign has been deleted!', 'Deleted!');
      this.campaignsService.refreshData();
      this.campaignsService.requestData().subscribe((data: CampaignData) => {
        this.data = data;
      });
    }, error => {
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });
  }

  send(campaign) {
    this.loading = true;
    this.campaignsService.SendCampaign(campaign).subscribe(result => {
      this.toastrService.primary('🎉 The campaign has been sent!', 'Success!');
      this.campaignsService.refreshData();
      this.campaignsService.data.subscribe((data: CampaignData) => {
        this.data = data;
      });
      this.loading = false;
    }, error => {
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
      this.campaignsService.refreshData();
      this.loading = false;
    });
  }
  
  toggle(check) {

    if(check === 0 && this.isAnalytics) {

      this.isAnalytics = !this.isAnalytics;
      
      // let temp = this.btnstatus[1];

      // this.btnstatus[1] = this.btnstatus[0];
      // this.btnstatus[0] = temp;

      // temp = this.settingClass[1];
      // this.settingClass[1] = this.settingClass[0];
      // this.settingClass[0] = temp;

      let temp = this.btnstatus[1];

      this.btnstatus[1] = this.btnstatus[0];
      this.btnstatus[0] = temp;

      temp = this.settingClass[1];
      this.settingClass[1] = this.settingClass[0];
      this.settingClass[0] = temp;
      
    }
    if(check === 1 && !this.isAnalytics) {

      this.isAnalytics = !this.isAnalytics;

      let temp = this.btnstatus[0];

      this.btnstatus[0] = this.btnstatus[1];
      this.btnstatus[1] = temp;

      temp = this.settingClass[0];
      this.settingClass[0] = this.settingClass[1];
      this.settingClass[1] = temp;

      
    }
  }

  getChartTitle(){
    return this.selectedChart.charAt(0).toUpperCase() + this.selectedChart.slice(1) + ' Messages';
  }

  getFilter(){
    switch(this.selectedItem){
      case '0':
        return 'month';
      case '1':
        return 'week';
      case '2':
        return 'day';
      default:
        return 'month';
    }
  }

  updateTimeFilter(){
    this.dataReady = false;
    this.dataReady = true;
  }

  isToday(date: Date) {
    if(date === null) {
      return false;
    }
    const today = new Date();
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
  }

  selectContactId(id) {
    this.selectedContactId = id;
  }
}
