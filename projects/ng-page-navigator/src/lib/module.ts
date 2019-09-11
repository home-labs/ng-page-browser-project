import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageNavigatorComponent } from './page-navigator/component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PageNavigatorComponent
    ],
    exports: [
        PageNavigatorComponent
    ]
})
export class NgPageNavigatorModule { }
