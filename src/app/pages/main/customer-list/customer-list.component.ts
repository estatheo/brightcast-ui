import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  contacts = [
    {},
    {},
  ]
  constructor() { }

  ngOnInit(): void {
  }

}