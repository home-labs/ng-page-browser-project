import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

// import { NgPageNavigatorModule } from '../../projects/ng-page-navigator/src/public_api';
import { NgPageNavigatorModule } from 'ng-page-navigator';


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
