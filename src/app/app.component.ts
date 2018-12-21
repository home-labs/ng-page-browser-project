import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    currentPageNumber: number;

    constructor() {
        this.currentPageNumber = 1;
    }

    onChangePage(pageNumber: number) {
        this.currentPageNumber = pageNumber;
    }

}
