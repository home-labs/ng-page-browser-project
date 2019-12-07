import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { PageBrowserComponent } from '@rplaurindo/ng-page-browser';

import { NgPageBrowser } from '@rplaurindo/ng-page-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: true }) private pageBrowser: PageBrowserComponent;

    enablePageNumberInputBox: boolean;

    collectionPromise: Promise<object[]>;

    collectionPagination: NgPageBrowser.Pagination<object>;

    pageNumber: number;

    limit: number;

    private page: object[];

    private count: number;

    constructor() {
        this.enablePageNumberInputBox = true;
        this.pageNumber = 1;
        this.limit = 5;
    }

    ngOnInit() {
        const collection: object[] = [];
        this.count = 10000;

        for (let i = 1; i <= this.count; i++) {
            collection.push({
                property1: `property1 value ${i}`
                , property2: `property2 value ${i}`
            });
        }

        this.collectionPagination = new NgPageBrowser.Pagination(collection, this.limit);

        this.getPage();
    }

    onChangePage(pageNumber: number) {
        this.pageNumber = pageNumber;

        this.getPage();
    }

    getPage() {
        this.collectionPromise = new Promise(
            (accomplish: (collection: object[]) => void) => {

                const interval = setInterval(
                    () => {
                        this.page = this.collectionPagination.getPage(this.pageNumber);

                        this.pageBrowser.totalPages = NgPageBrowser.Pagination
                            .calculatesTotalPages(this.count, this.limit);

                        accomplish(this.page);

                        console.log('function called after an interval');
                        clearInterval(interval);
                    }, 1500
                );

            }
        );
    }

}
