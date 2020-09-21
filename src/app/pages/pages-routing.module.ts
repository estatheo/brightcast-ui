import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [

    {
      path: 'dashboard',
      component: ECommerceComponent,
    },
    
    { path: 'logout',
      component: LogoutComponent,
    },
    {
      path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
