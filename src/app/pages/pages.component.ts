import { Component } from '@angular/core';
import { NbMenuItem, NbMenuService } from '@nebular/theme';
import { icon } from 'leaflet';
import { CampaignService } from '../@core/apis/campaign.service';
import { ContactListService } from '../@core/apis/contactList.service';

import { MENU_ITEMS } from './pages-menu';
import { CampaignData } from './_models/campaignData';
import { ContactListElement } from './_models/contactListElement';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout class="column">
    <nb-menu [items]="menu" class="menu"></nb-menu>
    <nb-menu [items]="menu2" class="menu"></nb-menu>
    <nb-menu [items]="menu3" class="menu"></nb-menu>
    <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu: NbMenuItem[] = [
    {
      title: 'CAMPAIGNS',
      expanded: true,
      link:`/pages/main/campaign`,
      children: [
        {
          title: 'New Campaign',
          icon: 'plus-outline',
          link: '/pages/main/new/campaign',        
        }
      ],

    }];

    menu2: NbMenuItem[] = [      
      {
        title: 'CONTACT LISTS',
        expanded: true,
        link:`/pages/main/customer-list`,
        children: [
          {
            title: 'New Contact List',
            icon: 'plus-outline',
            link: '/pages/main/new/customer-list',        
          }
        ]
      }];


  menu3: NbMenuItem[] = [
    {
      title: 'Account settings',
      link:`/pages/main/settings`,
      icon: 'settings-2-outline',
    },
    {
      title: 'Log Out',
      link:`/pages/logout`,
      icon: 'log-out-outline',
    },
  ]


  constructor(private menuService: NbMenuService, private campaignService: CampaignService, private contactListService: ContactListService) {
    this.campaignService.data.subscribe((c: CampaignData) => {
      c.campaigns.forEach(y => this.menu.find(x => x.title === 'CAMPAIGNS').children.push({title: y.name, link:`/pages/main/campaign/${y.id}`, icon: 'hash-outline',  data: {id: y.id}}))
    });
    this.contactListService.data.subscribe((cl: ContactListElement[]) => {
      cl.forEach(y => this.menu2.find(x => x.title === 'CONTACT LISTS').children.push({title: y.name, link:`/pages/main/customer-list/${y.id}`, icon: 'person-outline', data: {id: y.id}}))
    });
  }

  //todo: retrieve campaigns and contact lists and push it into menu pages
}
