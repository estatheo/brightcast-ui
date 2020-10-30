import { Injectable } from '@angular/core';
import { MenuItem } from '../../pages/_models/MenuItem';
@Injectable()
export class MenuService {

  selectedCampaign: MenuItem;

  constructor() {
  }

  setSelectedCampaign(item: MenuItem) {
    this.selectedCampaign = item;
  }

  getSelectedCampaign() {
    return this.selectedCampaign;
  }
}
