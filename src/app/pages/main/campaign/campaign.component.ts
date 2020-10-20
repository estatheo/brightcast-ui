import { Component, ElementRef, NgZone, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NbWindowService, NbToastrService } from '@nebular/theme';
import { CampaignService} from '../../../@core/apis/campaign.service';
import { CampaignData } from '../../_models/campaignData';
import { CampaignElement } from '../../_models/campaignElement';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Campaign } from '../../_models/campaign';
import { Contact } from '../../_models/contact';
import { ContactPreview } from '../../_models/contactPreview';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ChatMessage } from '../../_models/chat';
import { ContactService } from '../../../@core/apis/contact.service';
import { ChatService } from '../chat/chat.service';
import { UserProfile } from '../../_models/userProfile';
import { AccountService } from '../../_services';

@Component({
  selector: 'ngx-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {

  @ViewChildren("commentDiv") commentDivs: QueryList<ElementRef>;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private campaignsService: CampaignService,
    private contactService: ContactService,
    private userService: AccountService,
    private _ngZone: NgZone,
    private chatService: ChatService) {
      this.subscribeToEvents();
    }
  loading = false;
  dataReady = true;
  isAnalytics = false;
  // contacts: ContactPreview[] = [{firstName: 'Theo', lastName: 'Chichirita', body: 'This is a message for', time: new Date(), id: 1},{firstName: 'Theo', lastName: 'Chichirita', body: 'This is a message for', time: new Date(), id: 2}];
  // messages: ChatMessage[]  = [{id: 1, text: 'hi', reply: false},{id: 2, text: 'hi', reply: true}, {id: 1, text: 'hi', reply: false},{id: 2, text: 'hi', reply: true}];
  contacts: ContactPreview[] = [];
  messages: ChatMessage[] = []; 
  data: any;
  selectedContactId = 0;
  selectedChart = 'delivered';
  btnstatus = ['outline', 'hero'];
  settingClass = ['personal', 'business'];
  selectedItem = "0";
  campaignId: number;
  routeSub: Subscription;  
  user: UserProfile;
  campaign: Campaign;
  
  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.registerOnServerEvents();
    this.routeSub =  this.route.params.subscribe(p => {
      this.campaignId = p['id'];
      this.userService.getUserProfile()
      .subscribe((user: UserProfile) => {
        this.user = user;
        this.campaignsService.GetCampaignData(this.campaignId).subscribe((data: Campaign) => {
          this.campaign = data;
          this.contactService.GetContactsByCampaignId(this.campaign.id).subscribe((c: ContactPreview[]) => {
            this.contacts = c;
            this.selectedContactId = this.contacts[0]?.id;
            this.chatService.loadMessagesByCampaignAndContactId(this.campaign.id, this.selectedContactId).subscribe((data: ChatMessage[]) => {
              data.forEach((message: ChatMessage) => {
                if (message.senderId === this.user.id) {
                  message.reply = true;
                }
                this.messages.push(message);
              });
            });
          });
        });
      });
    });    
  }

  ngAfterViewInit() {
    this.commentDivs.changes.subscribe(() => {
      if (this.commentDivs && this.commentDivs.last) {
        this.commentDivs.last.nativeElement.focus();
      }
    });
  }
  
  sendMessage(msg: any) {
    // const files = !event.files ? [] : event.files.map((file) => {
    //   return {
    //     url: file.src,
    //     type: file.type,
    //     icon: 'nb-compose',
    //   };
    // });

    const tempMsg = new ChatMessage();
    tempMsg.text = msg;
    tempMsg.createdAt = new Date();
    tempMsg.reply = true;
    tempMsg.type = 'text';
    tempMsg.files = '';
    tempMsg.senderId = this.user.id;
    tempMsg.senderName = this.user.firstName + ' ' + this.user.lastName;
    tempMsg.avatarUrl = this.user.pictureUrl;
    tempMsg.campaignId = this.campaign.id;
    tempMsg.contactId = this.selectedContactId;
    this.messages.push(tempMsg);
    this.chatService.newChatMessage(tempMsg).subscribe(() => {
    }, error => {
      this.toastrService.danger(error, 'There was an error on our side😢');
    });
  }

  private subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((message: ChatMessage) => {
      this._ngZone.run(() => {
        if (message.campaignId !== this.campaign.id || message.contactId !== this.selectedContactId) {
          return;
        }
        message.reply = true;
        if (message.senderId !== this.user.id) {
          message.reply = false;
          this.messages.push(message);
        } else {
          //template message

          this.messages.push(message);
        }
      });
    });
  }

  selectContact(contactId: number) {
    this.selectedContactId = contactId;
    
    this.messages = [];

    this.chatService.loadMessagesByCampaignAndContactId(this.campaign.id, this.selectedContactId).subscribe( (data: ChatMessage[]) => {
              data.forEach((message: ChatMessage) => {
                if (message.senderId === this.user.id) {
                  message.reply = true;
                }
                this.messages.push(message);
              });              
            });
  }

  toggle(check) {

    if(check === 0 && this.isAnalytics) {

      this.isAnalytics = !this.isAnalytics;
      
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

  isToday(dateString) {
    let date = new Date(dateString);
    
    if(date === null) {
      return false;
    }
    const today = new Date();
    return date.getDate() == today.getDate() && date.getMonth() == today.getMonth() && date.getFullYear() == today.getFullYear();
  }

  selectContactId(id) {
    this.messages = [];
    this.selectedContactId = id;
    this.chatService.loadMessagesByCampaignAndContactId(this.campaign.id, this.selectedContactId).subscribe((data: ChatMessage[]) => {
      data.forEach((message: ChatMessage) => {
        if (message.senderId === this.user.id) {
          message.reply = true;
        }
        this.messages.push(message);
      });
    });
  }

  send() {
    this.campaignsService.SendCampaign(this.campaign).subscribe(() => {
      this.toastrService.primary('🎉 The Campaign has been sent!', 'SENT!');
      window.location.reload();
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });
  }
}
