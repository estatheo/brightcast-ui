import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  btnstuatus = ['primary', 'secondary']
  settingClass = ['personal', 'business'];
  constructor() { }

  ngOnInit(): void {
  }
  toggle() {
    let temp = this.btnstuatus[0];
    this.btnstuatus[0] = this.btnstuatus[1];
    this.btnstuatus[1] = temp;

    temp = this.settingClass[0];
    this.settingClass[0] = this.settingClass[1];
    this.settingClass[1] = temp;
  }
}