import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

// import { PageBrowserComponent } from '@rplaurindo/ng-page-browser';
import { PageBrowserComponent } from 'projects/ng-page-browser';

// import { NgPageBrowser } from '@rplaurindo/ng-page-browser';
import { NgPageBrowser } from 'projects/ng-page-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: true }) private pageBrowser: PageBrowserComponent;

    collectionPromise: Promise<object[]>;

    pageNumber: number;

    limit: number;

    private collection: object[];

    private count: number;

    constructor() {
        this.pageNumber = 1;
        this.limit = 5;
    }

    async ngOnInit() {
        this.collection = [];
        this.count = 10000;

        for (let i = 1; i <= this.count; i++) {
            this.collection.push({
                property1: `property1 value ${i}`
                , property2: `property2 value ${i}`
            });
        }

        await this.getPage();

        this.pageBrowser.totalPages = NgPageBrowser.Pagination
            .calculatesTotalPages(this.count, this.limit);
    }

    onChangePage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    async getPage(): Promise<object[]> {
        this.collectionPromise = new Promise(
            (accomplish: (collection: object[]) => void) => {

                const interval = setTimeout(
                    () => {
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
