import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../../pages/_services';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent implements OnInit {
  linearMode = true;
  loading = false;
  userPicture: FormData;
  businessLogo: FormData;
  contactListData: FormData;
  mediaData: FormData;
  model;
  form1: any;
  form2: any;
  form3: any;
  form4: any;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private toastrService: NbToastrService) { }

  ngOnInit(): void {  }
  
}
