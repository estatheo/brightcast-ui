import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { ContactListNewComponent } from './contact-list-new/contact-list-new.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { ContactListEditComponent } from './contact-list-edit/contact-list-edit.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'settings', component: SettingsComponent,
      },
      {
        path: 'customer-list/:id', component: CustomerListComponent,
      },
      {
        path: 'customer-list/:id/edit', component: ContactListEditComponent,
      },
      {
        path: 'new/customer-list', component: ContactListNewComponent,
      },
      {
        path: 'campaign/:id', component: CampaignComponent,
      },
      {
        path: 'campaign/:id/edit', component: CampaignEditComponent,
      },
      {
        path: 'new/campaign', component: CampaignNewComponent,
      },
      {
        path: 'customer-list/:id/new/contact', component: ContactNewComponent,
      },
      {
        path: 'customer-list/:contactListId/contact/:id/edit', component: ContactEditComponent,
      },
      {
        path: 'chat', component: ChatComponent,
      },
      {
        path: 'campaign/chat/:campaignId/:contactId', component: ChatComponent,
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }
