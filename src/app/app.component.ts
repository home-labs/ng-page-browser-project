import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'app';

    currentPageNumber: number;
    totalPages: number;

    constructor() {
        this.currentPageNumber = 1;
        this.totalPages = 10;
    }

    onChangePage(pageNumber: number) {
        this.currentPageNumber = pageNumber;
    }

}
