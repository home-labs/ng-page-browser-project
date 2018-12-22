import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    RouterModule
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
