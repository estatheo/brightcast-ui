import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';
import { MainComponent } from './main/main.component';
import { CustomerListComponent } from './customer-list/customer-list.component';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'customer-list', component: CustomerListComponent,
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
