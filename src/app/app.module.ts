import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NgPageBrowserModule } from '@rplaurindo/ng-page-browser';
// import { NgPageBrowserModule } from 'projects/ng-page-browser';


@NgModule({
    imports: [
        BrowserModule
        , NgPageBrowserModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
