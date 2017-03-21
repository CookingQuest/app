import { NgModule } from '@angular/core';

import { TutorialComponent } from './tutorial.component';
import { TutorialRoutingModule } from './tutorial-routing.module';

@NgModule({
  imports: [TutorialRoutingModule],
  declarations: [TutorialComponent],
  exports: [],
  providers: []
})
export class TutorialModule { }
