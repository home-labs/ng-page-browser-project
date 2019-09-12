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

    title = 'app';

    currentPageNumber: number;

    enablePageNumberInputBox: boolean;

    constructor() {
        this.currentPageNumber = 1;
        this.enablePageNumberInputBox = true;

        const
            interval = setInterval(
                () => {
                    this.pageBrowser.totalPages = 1110;
                    console.log('function called after interval');
                    clearInterval(interval);
                }, 2000
            );
    }

    ngOnInit() {

    }

    onChangePage(pageNumber: number) {
        this.currentPageNumber = pageNumber;
    }

}
