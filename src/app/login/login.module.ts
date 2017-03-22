import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from 'app/shared';
import { LoginComponent } from './login.component';
import { LoginEffects } from './login.effects';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    LoginRoutingModule, SharedModule,
    EffectsModule.run(LoginEffects)],
  declarations: [LoginComponent],
  exports: [],
  providers: []
})
export class LoginModule { }
