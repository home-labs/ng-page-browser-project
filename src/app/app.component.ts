import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { NgPageNavigator } from '../../projects/ng-page-navigator/src/public_api';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

    @ViewChild('pageNavigator') private pageNavigator: NgPageNavigator.Components.PageNavigatorComponent;

    title = 'app';

    currentPageNumber: number;

    enablePageNumberInputBox: boolean;

    constructor() {
        this.currentPageNumber = 1;
        this.enablePageNumberInputBox = true;

        const
            interval: NodeJS.Timer = setInterval(
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
        this.pageNavigator.totalPages = 11110;
        this.currentPageNumber = pageNumber;
    }

}
