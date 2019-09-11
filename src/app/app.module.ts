import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { NgPageNavigatorModule } from '@rplaurindo/ng-page-navigator';


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
