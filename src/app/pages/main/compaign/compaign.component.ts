import { Component, OnInit } from '@angular/core';
import { NbWindowService } from '@nebular/theme';
import { CompaignFormComponent } from './compaign-form/compaing-form.component';
import { CompaignService } from './compaign-form/compaign-form.service';
import { of as observableOf, Observable } from 'rxjs';

@Component({
  selector: 'ngx-compaign',
  templateUrl: './compaign.component.html',
  styleUrls: ['./compaign.component.scss']
})
export class CompaignComponent implements OnInit {

  constructor(private windowService: NbWindowService, private compaignService: CompaignService) { }
  data = [
    {
      name: "initial",
      sent: 100,
      read: 0,
      response: 0,
      status: 1,
    },
    {
      name: "Product Launch",
      sent: 100,
      read: 1,
      response: 0,
      status: 2,
    },
    {
      name: "Marketing",
      sent: 100,
      read: 0,
      response: 0,
      status: 3,
    }
  ];
  ngOnInit(): void {
  }
  openModal() {
    console.log("the modal open button clicked");
    let event = {
      sent: 0,
      read: 0,
    }
    let observable = observableOf(event);
    this.compaignService.setState(observable);
    this.windowService.open(CompaignFormComponent, { title: 'window' });
  }
  openModalForEdit(event) {
    console.log("the event from the Edit: ", event);
    let observable = observableOf(event);
    this.compaignService.setState(observable);
    this.windowService.open(CompaignFormComponent, { title: 'window' });
  }
}
