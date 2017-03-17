import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { RectBtnComponent } from './rect-btn/rect-btn.component';

@NgModule({
  imports:      [ MaterialModule.forRoot() ],
  declarations: [ RectBtnComponent ],
  exports:      [ CommonModule, ReactiveFormsModule, MaterialModule, RectBtnComponent ]
})
export class SharedModule { }
