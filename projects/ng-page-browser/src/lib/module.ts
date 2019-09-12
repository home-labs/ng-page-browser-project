import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageBrowserComponent } from './page-browser/component';


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , RouterModule.forRoot([])
  ],
  declarations: [
    PageBrowserComponent
  ],
  exports: [
    PageBrowserComponent
  ]
})
export class NgPageBrowserModule { }
