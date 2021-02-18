import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageBrowserComponent } from './page-browser/component';

import { GetPagePerPipe } from './get-page-per/pipe';


@NgModule({
    imports: [
        CommonModule
        , FormsModule
        , RouterModule.forRoot([])
    ],
    declarations: [
        PageBrowserComponent
        , GetPagePerPipe
    ],
    exports: [
        PageBrowserComponent
        , GetPagePerPipe
    ]
})
export class NgPageBrowserModule { }
