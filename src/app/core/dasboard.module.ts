import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DasboardRoutingModule } from './dasboard-routing.module';
import { CompaniesModule } from './pages/companies/companies.module';
import { CompanyEditModule } from './pages/companies/edit/company-edit.module';
import { HomeModule } from './pages/home/home.module';
import { ModalModule } from './pages/home/modal/modal.module';
import { LayoutModule } from './pages/layout/layout.module';
import { EditModule } from './pages/shipments/edit/edit.module';
import { ShipmentsModule } from './pages/shipments/shipments.module';
import { UsersModule } from './pages/users/users.module';
import { CompanyCreateModule } from './pages/companies/create/company-create.module';

@NgModule({
  imports: [
    CommonModule,
    DasboardRoutingModule,
    LayoutModule,
    HomeModule,
    ModalModule,
    ShipmentsModule,
    CompaniesModule,
    CompanyEditModule,
    EditModule,
    UsersModule, 
    CompanyCreateModule,
  ],
})
export class DasboardModule {}
