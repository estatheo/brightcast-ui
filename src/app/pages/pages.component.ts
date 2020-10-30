import { Component, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService } from '@nebular/theme';
import { CampaignService } from '../@core/apis/campaign.service';
import { ContactListService } from '../@core/apis/contactList.service';
import { MenuService } from '../@core/apis/menu.service';

import { CampaignData } from './_models/campaignData';
import { ContactListElement } from './_models/contactListElement';
import { MenuItem } from './_models/MenuItem';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout class="column">
    <div class="container" *ngIf="!compact">
      <div class="campaign" >
        <div class="header">
          <div class="title">CAMPAIGNS</div>
          <button nbButton status="primary" class="button" [routerLink]="['/pages/main/new/campaign']"><nb-icon icon="plus-outline"></nb-icon></button>
        </div>
        <div class="list" *ngIf="campaigns?.length > 0">
          <div class="element" *ngFor="let campaign of campaigns" [routerLink]="[campaign?.link]" [ngClass]="{ 'selected': campaign === selectedCampaign }" (click)="selectCampaign(campaign)">
          <nb-icon icon="hash-outline" class="icon"></nb-icon>
          <p>{{campaign?.name}}</p>
          </div>
        </div>
        <div class="noList" *ngIf="campaigns?.length < 1">
          <p>No campaigns yet.</p>
          <a [routerLink]="['/pages/main/new/campaign']">Create a campaign</a>
        </div>        
      </div>
      <div class="contactList">
        <div class="header">
          <div class="title">CONTACT LISTS</div>
          <button nbButton status="primary" class="button" [routerLink]="['/pages/main/new/customer-list']"><nb-icon icon="plus-outline"></nb-icon></button>
        </div>
        <div class="list" *ngIf=" contactLists?.length > 0">
          <div class="element" *ngFor="let contactList of contactLists" [routerLink]="[contactList?.link]">
            <nb-icon icon="person-outline" class="icon"></nb-icon>
            <p>{{contactList?.name}}</p>
          </div>
        </div>
        <div class="noList" *ngIf="contactLists?.length < 1">
          <p>No lists yet.</p>
          <a [routerLink]="['/pages/main/new/customer-list']">Create a contact list</a>
        </div>
      </div> 
      <div class="option">
        <div class="item" [routerLink]="['/pages/main/settings']">
          <nb-icon icon="settings-2-outline" class="icon"></nb-icon>
          <p>Settings</p>
        </div>
        <div class="item" [routerLink]="['/pages/logout']">
          <nb-icon icon="log-out-outline" class="icon"></nb-icon>
          <p>Log out</p>
        </div>
      </div>
    </div>
    <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit{

  campaigns: MenuItem[] = [];
  contactLists: MenuItem[] = [];
  selectedCampaign: MenuItem;
  compact = false;

  constructor(private menuService: MenuService, private campaignService: CampaignService, private sidebarService: NbSidebarService) {
  }

  ngOnInit(): void {
    this.sidebarService.onToggle().subscribe(x => {
        this.compact = !this.compact;
    })
    this.campaignService.data.subscribe((c: CampaignData) => {
      c.campaigns?.forEach(y => this.campaigns.push({name: y.status === 0 ? y.name + ' (draft)': y.name, link: `/pages/main/campaign/${y.id}`}));
      c.contactLists?.forEach(y => this.contactLists.push({name: y.name, link: `/pages/main/customer-list/${y.id}`}));
      this.selectedCampaign = this.menuService.getSelectedCampaign();
    });

  }

  selectCampaign(item: MenuItem) {
    this.menuService.setSelectedCampaign(item);
    this.selectedCampaign = item;

  }
}
