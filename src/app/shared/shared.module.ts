import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import { BtnComponent } from './btn/btn.component';

@NgModule({
  imports: [MaterialModule.forRoot()],
  declarations: [BtnComponent],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, BtnComponent]
})
export class SharedModule { }
