import { NgModule, Optional, SkipSelf } from '@angular/core';

import { ApiService } from './api';

import { SharedModule } from 'app/shared';

import { HeaderComponent } from './header';
import { UserComponent } from './user';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ HeaderComponent, UserComponent ],
  exports: [ HeaderComponent ],
  providers: [ ApiService ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
