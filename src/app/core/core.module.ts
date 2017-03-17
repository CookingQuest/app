import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { ApiService } from 'api';

@NgModule({
  imports: [ MaterialModule.forRoot() ],
  exports: [ MaterialModule ],
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
