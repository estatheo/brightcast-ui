import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { NgxDataTableModule } from 'angular-9-datatable';
import {
  NbAccordionModule,
  NbButtonModule,
  NbCardModule,
  NbListModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbTabsetModule,
  NbUserModule,
  NbInputModule,
  NbSelectModule,
  NbIconModule,
  NbLayoutModule,
  NbWindowModule,
  NbCheckboxModule,
  NbTooltipModule,
  NbAlertModule,
  NbSpinnerModule,
  NbChatModule,
  NbMenuModule,
  NbToastrModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { CampaignComponent } from './campaign/campaign.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CampaignService} from '../../@core/apis/campaign.service';
import { ContactListService } from '../../@core/apis/contactList.service';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from '../../@core/apis/contact.service';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ChatComponent } from './chat/chat.component';
import { ECommerceModule } from '../e-commerce/e-commerce.module';
import { ContactListNewComponent } from './contact-list-new/contact-list-new.component';
import { ContactNewComponent } from './contact-new/contact-new.component';
import { CampaignNewComponent } from './campaign-new/campaign-new.component';
import { CampaignEditComponent } from './campaign-edit/campaign-edit.component';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { ContactListEditComponent } from './contact-list-edit/contact-list-edit.component';
import { ChatService } from './chat/chat.service';
import { OnboardingComponent } from '../../custom/onboarding/onboarding.component';
import { CheckoutSuccessComponent } from './checkout-success/checkout-success.component';
import { CheckoutCanceledComponent } from './checkout-canceled/checkout-canceled.component';
import { MembershipService } from '../../@core/apis/membership.service';
@NgModule({
  declarations: [
    SettingsComponent,
    MainComponent,
    CustomerListComponent,
    CampaignComponent,
    CampaignNewComponent,
    ContactComponent,
    ChatComponent,
    ContactListNewComponent,
    ContactListEditComponent,
    ContactNewComponent,
    CampaignEditComponent,
    ContactEditComponent,
    OnboardingComponent,
    CheckoutSuccessComponent,
    CheckoutCanceledComponent
  ],
  imports: [
    CommonModule,
    ThemeModule,
    NbInputModule,
    NbTabsetModule,
    NbSelectModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbListModule,
    NbAccordionModule,
    NbUserModule,
    NbIconModule,
    NbLayoutModule,
    NbInputModule,
    NbStepperModule,
    NbWindowModule.forChild(),
    FormsModule,
    ReactiveFormsModule,
    NgxDataTableModule,
    MainRoutingModule,
    NbCheckboxModule,
    NbTooltipModule,
    NbAlertModule,
    NbSpinnerModule,
    ClipboardModule,
    NbChatModule,
    NbMenuModule,
    NbToastrModule,
    ECommerceModule
  ],
  entryComponents: [

  ],
  providers: [
    CampaignService,
    ContactListService,
    ContactService,
    ChatService,
    MembershipService
  ],
})
export class MainModule { }
