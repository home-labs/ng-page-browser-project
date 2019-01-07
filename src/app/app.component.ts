import {
    Component,
    AfterViewInit
} from '@angular/core';

import { NgPageNavigator } from '../../projects/ng-page-navigator/src/public_api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements AfterViewInit {
    title = 'app';

    currentPageNumber: number;
    enablePageNumberInputBox: boolean;

    private pagination: NgPageNavigator.Pagination;

    constructor() {
        this.currentPageNumber = 1;
        this.enablePageNumberInputBox = true;
    }

    ngAfterViewInit() {
        const
            interval = setInterval(
                () => {
                    this.pagination.totalPages = 11110;
                    console.log('function called after interval');
                    clearInterval(interval);
                }, 5000
            );
    }

    onChangePage(pageNumber: number) {
        this.currentPageNumber = pageNumber;
    }

    onPaginatorInit(pagination: NgPageNavigator.Pagination) {
        this.pagination = pagination;
    }

}
