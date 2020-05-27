import { Component } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { CompaignService } from './compaign-form.service';

@Component({
    template: `
    <form class="form">
    <div class="form-group">
      <label for="name" class="label">Name:</label>
      <input nbInput fullWidth id="name" type="text" value="{{event.read}}">
      </div>
      <label for="date" class="label">Delivery Date</label>
      <input type="date" nbInput fullWidth id="date">
    
      <label for="file" class="label">Compaign file</label>
      <input type="file" nbInput fullWidth id="file">
    
      <label class="text-label" for="message">BroadCast Message</label>
      <textarea nbInput fullWidth id="message"></textarea>

      <div class="form-group">
      <label for="selective_input" class="label">Customer list</label>
      <nb-select selected="1" id="selective_input" fullWidth>
          <nb-option value="1">List 1</nb-option>
          <nb-option value="2">List 2</nb-option>
      </nb-select>
    </div>
  <button type="submit" style="margin-top: 10px" nbButton status="primary">Save</button>
    </form>
  `,
    styleUrls: ['compaing-form.component.scss'],
})
export class CompaignFormComponent {

    event;
    constructor(public windowRef: NbWindowRef, private compaignService: CompaignService) {


        compaignService.getState().subscribe(event => {
            console.log("THe event from compaing service: ", event);
            this.event = event;
        })

    }

    close() {
        this.windowRef.close();
    }
}
