import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbMenuItem, NbToastrService } from '@nebular/theme';
import { ChatService } from './chat.service';
import { CampaignService} from '../../../@core/apis/campaign.service';
import { CampaignData } from '../../_models/campaignData';
import { ContactService } from '../../../@core/apis/contact.service';
import { Contact } from '../../_models/contact';
import { AccountService } from '../../../pages/_services';
import { UserProfile } from '../../../pages/_models/userProfile';
import { ChatMessage } from '../../_models/chat';
import { Invitation } from '../../_models/invitation';
import { ContactList } from '../../_models/contactList';

@Component({
  selector: 'ngx-chat',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.scss'],
  providers: [ ChatService ],
})
export class ChatComponent implements OnInit {
  chat_menu: Array<NbMenuItem> = [];
  messages: ChatMessage[] = [];
  campaign_data: CampaignData;
  chat_title: string = 'Chat';
  chat_themes = ['success', 'danger', 'primary', 'info', 'warning'];
  chat_theme: string;
  campaign_id: number;
  contact: Contact;
  customer_list: Contact[] = [];
  showInvite = false;
  user: UserProfile;

  constructor(
    protected chatService: ChatService,
    private toastrService: NbToastrService,
    private campaignsService: CampaignService,
    private contactService: ContactService,
    private userService: AccountService,
    private _ngZone: NgZone,
    private route: ActivatedRoute) {
    // this.messages = this.chatService.loadMessages();
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.chatService.startConnection();
    this.chatService.registerOnServerEvents();
    this.chat_theme = this.chat_themes[Math.floor(Math.random() * 5)];

    this.userService.getUserProfile()
      .subscribe((user: UserProfile) => {
        this.user = user;
        this.route.params.subscribe(p => {
          this.campaign_id = parseInt(p['campaignId'], 10);
          var contact_id = parseInt(p['contactId'], 10);
          if(!(isNaN(this.campaign_id) || isNaN(contact_id))){
            this.chatService.loadMessagesByCampaignAndContactId(this.campaign_id, contact_id).subscribe( (data: ChatMessage[]) => {
              data.forEach((message: ChatMessage) => {
                if (message.senderId === this.user.id) {
                  message.reply = true;
                }
                this.messages.push(message);
              });
              var replies = this.messages.filter(x => x.senderId !== this.user.id);
              if(this.messages.length === 0 || this.messages.filter(x => x.senderId !== this.user.id).length === 0 || ((new Date().getTime() - new Date(this.messages.filter(x => x.senderId !== this.user.id)[this.messages.filter(x => x.senderId !== this.user.id).length - 1].createdAt).getTime()) / 1000 / 60 / 60) >= 24 ) { 
                this.showInvite = true;
              } else {
                this.showInvite = false;
              }
            });
          }        
        });
      });

    this.campaignsService.refreshData();
    this.campaignsService.data.subscribe((data: CampaignData) => {
      this.campaign_data = data;
      this.campaign_data.campaigns.forEach((campaign_item) => {        
        this.chat_menu.push({
          title: campaign_item.name,
          url: '/pages/main/campaign/chat/' + campaign_item.id + '/NaN'
        });     
        if (campaign_item.id === this.campaign_id) {          
          campaign_item.contactListIds.forEach(contactListId => {
            this.contactService.SetContactListId(contactListId);
            this.contactService.data.subscribe((contactlist: Contact[]) => {
              this.contactService.refreshData();
              this.customer_list = contactlist;
              this.contact =  Object.assign({}, this.customer_list[0]);              
            });
          });         
        }
      });
    });
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'nb-compose',
      };
    });

    const tempMsg = new ChatMessage();
    tempMsg.text = event.message;
    tempMsg.createdAt = new Date();
    tempMsg.reply = true;
    tempMsg.type = files.length ? 'file' : 'text';
    tempMsg.files = files.toString();
    tempMsg.senderId = this.user.id;
    tempMsg.senderName = this.user.firstName + ' ' + this.user.lastName;
    tempMsg.avatarUrl = this.user.pictureUrl;
    tempMsg.campaignId = this.campaign_id;
    tempMsg.contactId = this.contact?.id;
    this.messages.push(tempMsg);
    this.chatService.newChatMessage(tempMsg).subscribe(() => {
    }, error => {
      this.toastrService.danger(error, 'There was an error on our side😢');
    });
  }

  private subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((message: ChatMessage) => {
      this._ngZone.run(() => {
        if (message.campaignId !== this.campaign_id || message.contactId !== this.contact?.id) {
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

        
        if(this.messages.length === 0 || this.messages.filter(x => x.senderId !== this.user.id).length === 0 || ((new Date().getTime() - new Date(this.messages.filter(x => x.senderId !== this.user.id)[this.messages.filter(x => x.senderId !== this.user.id).length - 1].createdAt).getTime()) / 1000 / 60 / 60) >= 24 ) {  
          this.showInvite = true;
        } else {
          this.showInvite = false;
        }
      });
    });
  }

  selectContact(contactId: number) {
    this.contact = Object.assign({},this.customer_list.find(x => x.id === contactId));
    
    this.messages = [];

    this.chatService.loadMessagesByCampaignAndContactId(this.campaign_id, this.contact.id).subscribe( (data: ChatMessage[]) => {
              data.forEach((message: ChatMessage) => {
                if (message.senderId === this.user.id) {
                  message.reply = true;
                }
                this.messages.push(message);
              });
              this.chat_title = 'Chat for \"' + this.campaign_data.campaigns.find(x => x.id === this.campaign_id).name + '\"' + ' with ' + '' + this.contact.firstName + ' ' + this.contact.lastName;
              if(this.messages.length === 0 ||  this.messages.filter(x => x.senderId !== this.user.id).length === 0 || ((new Date().getTime() - new Date(this.messages.filter(x => x.senderId !== this.user.id)[this.messages.filter(x => x.senderId !== this.user.id).length - 1].createdAt).getTime()) / 1000 / 60 / 60) >= 24 ) {  
                this.showInvite = true;
              }
            });
  }


  invite() {
    const tempMsg = new ChatMessage();
    tempMsg.text = "Chat Initialization through template";
    tempMsg.createdAt = new Date();
    tempMsg.reply = true;
    tempMsg.type = 'text';
    tempMsg.files = ""
    tempMsg.senderId = this.user.id;
    tempMsg.senderName = this.user.firstName + ' ' + this.user.lastName;
    tempMsg.avatarUrl = this.user.pictureUrl;
    tempMsg.campaignId = this.campaign_id;
    tempMsg.contactId = this.contact?.id;

    this.chatService.sendInviteMessage(tempMsg).subscribe(() => {
    }, error => {
      this.toastrService.danger(error, 'There was an error on our side😢');
    });
  }
}
