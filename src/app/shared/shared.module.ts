import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RectBtnComponent } from './rect-btn/rect-btn.component';

@NgModule({
  imports:      [ ],
  declarations: [ RectBtnComponent ],
  exports:      [ CommonModule, ReactiveFormsModule ]
})
export class SharedModule { }
