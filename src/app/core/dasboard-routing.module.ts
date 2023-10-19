import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompanyEditComponent } from './pages/companies/edit/company-edit.component';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { EditComponent } from './pages/shipments/edit/edit.component';
import { ShipmentsComponent } from './pages/shipments/shipments.component';
import { UsersComponent } from './pages/users/users.component';
import { CompanyCreateComponent } from './pages/companies/create/company-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'shipments',
        component: ShipmentsComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'shipments/edit/:id',
        component: EditComponent,
      },
      {
        path: 'companies/edit/:id',
        component: CompanyEditComponent,
      },
      {
        path: 'companies/create',
        component: CompanyCreateComponent

      },
      {
        path: 'users',
        component: UsersComponent,
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DasboardRoutingModule {}
