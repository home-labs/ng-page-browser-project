import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { PageBrowserComponent } from '@rplaurindo/ng-page-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: false }) private pageBrowser: PageBrowserComponent;

    enablePageNumberInputBox: boolean;

    collection: object[];

    pageNumber: number;

    limit: number;

    constructor() {
        this.enablePageNumberInputBox = true;
        this.collection = [];
        this.pageNumber = 1;
        this.limit = 5;

        const
            interval = setInterval(
                () => {
                    this.pageBrowser.totalPages = 1110;
                    for (let i = 1; i < this.pageBrowser.totalPages; i++) {
                        this.collection.push({
                            property1: `property1 value ${i}`
                            , property2: `property2 value ${i}`
                        });
                    }
                    console.log('function called after interval');
                    clearInterval(interval);
                }, 2000
            );

    }

    ngOnInit() {

    }

    onChangePage(pageNumber: number) {
        console.log(pageNumber);
        this.pageNumber = pageNumber;
    }

}
