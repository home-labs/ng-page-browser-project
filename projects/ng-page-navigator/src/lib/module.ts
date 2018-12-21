import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
    RouterModule,
    ActivatedRoute
} from '@angular/router';

import { PageNavigatorComponent } from './component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([])
    ],
    declarations: [
        PageNavigatorComponent
    ],
    exports: [
        CommonModule,
        RouterModule,
        PageNavigatorComponent
    ]
})
export class NgPageNavigatorModule { }
