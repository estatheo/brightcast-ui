import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { RequestPasswordComponent } from './request-password/request-password.component';


const routes: Routes = [
  {
    path: '', component: AuthComponent,    // first one has to auth component with router-outlet inside of it
    children: [
      {
        path: '', component: LoginComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent,
      },
      {
        path: 'reset-password', component: ResetComponent,
      },
      {
        path: 'request-password', component: RequestPasswordComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
