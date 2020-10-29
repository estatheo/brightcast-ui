import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { CampaignService } from '../../../@core/apis/campaign.service';
import { ContactListService } from '../../../@core/apis/contactList.service';
import { CampaignElement } from '../../_models/campaignElement';
import { ContactList } from '../../_models/contactList';
import { AccountService } from '../../_services';

@Component({
  selector: 'ngx-campaign-edit',
  templateUrl: './campaign-edit.component.html',
  styleUrls: ['./campaign-edit.component.scss']
})
export class CampaignEditComponent implements OnInit {
  
  routeSub: Subscription;
  step = 0;
  campaignId: number;
  campaignData: CampaignElement = {id: 0, contactListIds: [], response: 0, status: 0, fileUrl: '', message: '', name: '', read: 0, sent: 0};
  contactLists: ContactList[];
  title: any = '';
  contactListId: any = '0';
  contactListName;
  body: any = '';
  dateNow: Date = new Date();  
  image: FormData;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: NbToastrService,
    private contactListService: ContactListService,
    private campaignService: CampaignService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      this.campaignId = p['id'];
      this.campaignService.GetCampaignData(this.campaignId).subscribe((c: CampaignElement) => {
        this.campaignData = c;
        this.contactListService.data.subscribe((cl: ContactList[]) => {
          this.contactLists = cl;
        });
      });
    });

  }

  switchStep(s) {
    if( this.step === 0) {
      this.saveStepZero();
    }
    else if( this.step === 1) {
      this.saveStepOne();
    }
    else if( this.step === 2) {
      this.saveStepTwo();
    }
    this.step = s;
  }

  saveStepZero() {
    if(this.title !== null && this.title !== undefined && this.title !== ''){
      this.campaignData.name = this.title.trim();
    }
    this.step++;
  }

  saveStepOne() {
    if(this.campaignData?.contactListIds !== null && this.campaignData?.contactListIds !== undefined && this.campaignData?.contactListIds.length >= 1) {
      this.campaignData.contactListIds[0] = parseInt(this.contactListId);
    }
    else {
      this.campaignData.contactListIds = [parseInt(this.contactListId)];
    }

    this.contactListName = this.contactLists.filter(x => x.id === this.campaignData.contactListIds[0])[0].name;
    this.step++;
  }

  saveStepTwo() {
    if(this.body !== null && this.body !== undefined && this.body !== ''){
      this.campaignData.message = this.body;
    }
    this.step++;
  }

  sendNow() {
    this.campaignService.Update(this.campaignData).subscribe((c: CampaignElement) => {
      this.campaignService.SendCampaign(this.campaignData).subscribe(result => {
        this.toastrService.primary('🎉 The campaign has been sent!', 'SENT!');

        this.router.navigateByUrl('/pages/main/campaign/' + c.id);
      }, error => {
        //todo: send trace request to server
        this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
      })
      
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });

    
  }

  savePreview() {
    //status = 0 => created
    this.campaignService.Update(this.campaignData).subscribe((c: CampaignElement) => {
      this.toastrService.primary('🎉 The campaign has been saved!', 'SAVED!');

      this.router.navigateByUrl('/pages/main/campaign/' + c.id);
    }, error => {
      //todo: send trace request to server
      this.toastrService.danger('⚠ There was an error processing the request!', 'Error!');
    });
  }

  uploadImage(files) {
    if (files.length === 0) {
      return;
    }

    this.image = new FormData();

    for (const file of files) {
      this.image.append(file.name, file);
    }

    if (this.image != null || this.image !== undefined) {
      this.accountService.uploadImage(this.image).subscribe(im => {
        this.campaignData.fileUrl = im['name'];
      });
    }
  }
}
