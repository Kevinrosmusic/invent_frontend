import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';



@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ]
})
export class UsersModule { }
