import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { NbAuthModule } from '@nebular/auth';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule,
  NbCardModule,
} from '@nebular/theme';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { ResetComponent } from './reset/reset.component';
import { RequestPasswordComponent } from './request-password/request-password.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, AuthComponent, ResetComponent, RequestPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbCardModule,
    AuthRoutingModule,

    NbAuthModule,

  ]
})
export class AuthModule { }
