import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

// import { NgPageBrowser } from '@actjs.on/ng-page-browser';
import { NgPageBrowser } from 'projects/ng-page-browser/public-api';


interface TestUser {

    property1: string;

    property2?: string;

}


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: true })
    private pageBrowser!: NgPageBrowser.PageBrowserComponent;

    enablePageNumberInputBox: boolean;

    collectionPromise!: Promise<TestUser[]>;

    limit: number;

    pageNumber: number;

    private count: number;

    constructor() {
        this.limit = 5;
        this.enablePageNumberInputBox = true;

        this.pageNumber = 1;

        this.count = 1;
    }

    async ngOnInit() {

        await this.getPage();

        this.pageBrowser.totalPages = NgPageBrowser.Pagination
            .calculatesTotalPages(this.count, this.limit);
    }

    // protected for now it doesn't work when building the lib
    onChangePage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    private getPage(): Promise<TestUser[]> {

        const collection: TestUser[] = [];

        this.collectionPromise = new Promise(
            (accomplish: (collection: TestUser[]) => void) => {

                const interval = setTimeout(
                    () => {
                        this.count = 10000;

                        for (let i = 1; i <= this.count; i++) {
                            collection.push({
                                property1: `property1 value ${i}`
                                , property2: `property2 value ${i}`
                            });
                        }

                        accomplish(collection);

                        console.log('function called after an interval');
                        clearInterval(interval);
                    }, 1500
                );

            }
        );

        return this.collectionPromise;
    }

}
