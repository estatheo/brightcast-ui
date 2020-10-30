import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-checkout-success',
  templateUrl: './checkout-success.component.html',
  styleUrls: ['./checkout-success.component.scss']
})
export class CheckoutSuccessComponent implements OnInit {

  routeSub: Subscription;

  constructor(
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.routeSub =  this.route.params.subscribe(p => {
      console.log(p['session_id']);
    });
    
  }

}
