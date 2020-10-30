import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map, refCount, publishReplay } from 'rxjs/operators';
@Injectable()
export class MembershipService {

  apiURL: string = environment.apiUrl;
  priceId = environment.priceId;

  constructor(private httpClient: HttpClient) {
  }
  

  public initializeCheckout() {
    return this.httpClient.post(`${this.apiURL}/membership/checkout/create`, {priceId: this.priceId}).pipe(map(response => response));
  }
}
