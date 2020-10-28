import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AccountService } from '../_services';
import { DashboardService } from '../../@core/apis/dashboard.service';
import { CampaignService } from '../../@core/apis/campaign.service';
import { CampaignData } from '../_models/campaignData';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['e-commerce.component.scss'],
})
export class ECommerceComponent implements OnInit, AfterViewInit {

  absoluteValues;
  percentageValues;
  selectedChart = 'Delivered';
  dataReady = false;
  dashboardData;
  constructor(
    private accountService: AccountService,
    private campaignService: CampaignService,
    private router: Router,
    private dashboardService: DashboardService) {

  }

  ngOnInit() {
    this.campaignService.data.subscribe((c: CampaignData) => {
      if(c?.campaigns.length > 0) {
        this.router.navigateByUrl('/pages/main/campaign/' + c.campaigns[0]?.id);
      }
      else {
        this.router.navigateByUrl('pages/main/onboarding');
      }
    }, error  => {
      this.router.navigateByUrl('pages/main/onboarding');
    });
  }

  ngAfterViewInit() {
    /*
    const maxValue = Math.max.apply(null, this.absoluteValues);
    const self = this;
    const initial = 0;
    */
  }

  getOption() {
    return this.selectedChart.replace(/\s/g, '').toLowerCase();
  }

}
