import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

// import { NgPageBrowser } from '@actjs.on/ng-page-browser';
import { NgPageBrowser } from 'projects/ng-page-browser/public-api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: true })
    private pageBrowser!: NgPageBrowser.PageBrowserComponent;

    enablePageNumberInputBox: boolean;

    // collectionPromise!: Promise<object[]>;
    collectionPromise!: Promise<any[]>;

    collection: object[];

    limit: number;

    pageNumber: number;

    private count: number;

    constructor() {
        this.limit = 5;
        this.enablePageNumberInputBox = true;
        this.collection = [];

        this.pageNumber = 1;

        this.count = 1;

        // this.collectionPromise = this.getPage();

        // this.collectionPromise.then(
        //         (value: object[]) => {
        //             this.collection = value;
        //         }
        //     )
        // ;

        // this.getPage();
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

    private getPage(): Promise<object[]> {
        const collection: object[] = [];

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
