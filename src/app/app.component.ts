import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import {
    PageBrowserComponent
    , NgPageBrowser
} from '@actjs.on/ng-page-browser';

// import {
//     PageBrowserComponent
//     , NgPageBrowser
// } from 'projects/ng-page-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: true }) private pageBrowser: PageBrowserComponent;

    protected pageNumber: number;

    protected limit: number;

    protected collectionPromise: Promise<object[]>;

    protected enablePageNumberInputBox: boolean;

    private collection: object[];

    private count: number;

    constructor() {
        this.limit = 5;
        this.enablePageNumberInputBox = true;
        this.collection = [];
    }

    async ngOnInit() {

        await this.getPage();

        this.pageBrowser.totalPages = NgPageBrowser.Pagination
            .calculatesTotalPages(this.count, this.limit);
    }

    // protected for now it doesn't work when building the lib
    protected onChangePage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    private getPage(): Promise<object[]> {
        this.collectionPromise = new Promise(
            (accomplish: (collection: object[]) => void) => {

                const interval = setTimeout(
                    () => {
                        this.count = 10000;

                        for (let i = 1; i <= this.count; i++) {
                            this.collection.push({
                                property1: `property1 value ${i}`
                                , property2: `property2 value ${i}`
                            });
                        }

                        accomplish(this.collection);

                        console.log('function called after an interval');
                        clearInterval(interval);
                    }, 1500
                );

            }
        );

        return this.collectionPromise;
    }

}
