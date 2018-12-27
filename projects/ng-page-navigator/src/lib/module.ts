import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PageNavigatorComponent } from './component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forRoot([])
    ],
    declarations: [
        PageNavigatorComponent
    ],
    exports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PageNavigatorComponent
    ]
})
export class NgPageNavigatorModule { }
