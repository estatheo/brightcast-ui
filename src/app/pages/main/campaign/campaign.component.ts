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
  data: any;
  selectedChart = 'delivered';
  btnstatus = ['hero', 'outline'];
  settingClass = ['personal', 'business'];
  selectedItem = "0";
  campaignId: number;
  routeSub: Subscription;
  campaign: Campaign = { name: "Campaign One", response: 2, status: 1, contactListIds: [], delivered: 1000, read: 15000, subscribed: 1230, replies: 1231, deliveredPercentage: 12, readPercentage: -0.5, subscribedPercentage: -15, repliesPercentage: 23};
  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.campaignId = p['id'];
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
  
  toggle() {
    let temp = this.btnstatus[0];
    this.btnstatus[0] = this.btnstatus[1];
    this.btnstatus[1] = temp;

    temp = this.settingClass[0];
    this.settingClass[0] = this.settingClass[1];
    this.settingClass[1] = temp;
  }

  getChartTitle(){
    return this.selectedChart.charAt(0).toUpperCase() + this.selectedChart.slice(1) + ' Messages';
  }
}
