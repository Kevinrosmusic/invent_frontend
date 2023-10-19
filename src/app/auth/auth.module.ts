import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginModule } from './pages/login/login.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthRoutingModule, LoginModule],
})
export class AuthModule {}
