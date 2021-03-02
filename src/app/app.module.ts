import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { NgPageBrowserModule } from '@actjs.on/ng-page-browser';
// import { NgPageBrowserModule } from 'projects/ng-page-browser/public-api';


@NgModule({
    imports: [
        NgPageBrowserModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
