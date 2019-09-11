import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { PageNavigatorComponent } from '@rplaurindo/ng-page-navigator';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageNavigator', { static: true }) private pageNavigator: PageNavigatorComponent;

    title = 'app';

    currentPageNumber: number;

    enablePageNumberInputBox: boolean;

    constructor() {
        this.currentPageNumber = 1;
        this.enablePageNumberInputBox = true;

        const
            interval = setInterval(
                () => {
                    this.pageNavigator.totalPages = 1110;
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
