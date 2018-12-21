import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { NgPageNavigatorModule } from '../../projects/ng-page-navigator/src/public_api';


@NgModule({
    imports: [
        BrowserModule,
        NgPageNavigatorModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
