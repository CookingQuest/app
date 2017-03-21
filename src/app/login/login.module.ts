import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [LoginRoutingModule, SharedModule],
  declarations: [LoginComponent],
  exports: [],
  providers: []
})
export class LoginModule { }
