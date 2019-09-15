import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageBrowserComponent } from './page-browser/component';

import { GetPagePipe } from './get-page/pipe';


@NgModule({
    imports: [
        CommonModule
        , FormsModule
        , RouterModule.forRoot([])
    ],
    declarations: [
        PageBrowserComponent
        , GetPagePipe
    ],
    exports: [
        PageBrowserComponent
        , GetPagePipe
    ]
})
export class NgPageBrowserModule { }
