import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    // ViewChild
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { Subscription } from 'rxjs';
// import { NgForm } from '@angular/forms';


@Component({
    selector: 'page-navigator',
    templateUrl: './template.html',
    styleUrls: ['./style.sass']
})
export class PageNavigatorComponent implements OnInit, OnDestroy {

    @Input() queryParamPropertyName: string;

    @Input() totalPages: number;
    @Input() labelTranslations: Object;

    @Output() changePage: EventEmitter<number>;

    // private pageNumberBox: ElementRef;

    // @ViewChild('pageNumberBox') pageNumberBox: ElementRef;

    // @ViewChild('pageNumberBox') set content(content: ElementRef) {
    //     this.pageNumberBox = content;
    // }

    currentPageNumber: number = 1;
    bondedPageNumber: number = 1;
    maxlength: number = 1;

    firstPageLabel: string;
    previousPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;

    private queryParamsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.changePage = new EventEmitter();
    }

    ngOnInit() {

        this.queryParamsSubscription = this.route.queryParams.subscribe(
            (params: Object) => {
                if (params.hasOwnProperty(this.queryParamPropertyName)) {
                    this.currentPageNumber = Number
                        .parseInt(params[this.queryParamPropertyName]);
                    this.changePage.emit(this.currentPageNumber);
                }
            }
        );

        this.resolveLabelTranslations();

        this.maxlength = `${this.totalPages}`.length;

        // this.setMaxInputValidationMessage(this.pageNumberBox);
        // console.log(this.pageNumberBox);
    }

    ngOnDestroy() {
        if (this.queryParamsSubscription
            && this.queryParamsSubscription instanceof Subscription) {
            this.queryParamsSubscription.unsubscribe();
        }
    }

    // submit(form: NgForm) {
    //     form.ngSubmit.emit();
    // }

    private setMaxInputValidationMessage(input: HTMLInputElement) {
        // input.setCustomValidity(`Este campo deve ter o valor máximo de: ${this.totalPages}`);

        // const
        //     ngFrom: NgForm = input.form;
    }

    isOnFrontPage(): boolean {
        return this.currentPageNumber === 1;
    }

    isOnLastPage(): boolean {
        return this.currentPageNumber === this.totalPages;
    }

    getPreviousPage(): number {
        if (this.bondedPageNumber != this.currentPageNumber
            && this.bondedPageNumber < this.currentPageNumber) {
            return this.bondedPageNumber;
        }

        return this.currentPageNumber - 1;
    }

    getNextPage(): number {
        if (this.bondedPageNumber != this.currentPageNumber
            && this.bondedPageNumber > this.currentPageNumber) {
            return this.bondedPageNumber;
        }

        return this.currentPageNumber + 1;
    }

    navigateTo(pageNumber: number) {
        this.bondedPageNumber = parseInt(`${pageNumber}`);
        this.currentPageNumber = this.bondedPageNumber;

        if (this.queryParamPropertyName) {
            this.router.navigate([location.pathname],
                {
                    queryParams: this.getQueryParamsStatement(this.bondedPageNumber),
                    queryParamsHandling: "merge"
                }
            );
        } else {
            this.changePage.emit(this.bondedPageNumber);
        }
    }

    private getQueryParamsStatement(pageNumber: number): Object {
        const
            statement: Object = {};

        statement[this.queryParamPropertyName] = pageNumber;

        return statement;
    }

    private resolveLabelTranslations() {
        if (Object.keys(this.labelTranslations).length) {
            if (this.labelTranslations.hasOwnProperty('firstPage')) {
                this.firstPageLabel = this.labelTranslations['firstPage'];
            } else {
                this.firstPageLabel = 'first';
            }

            if (this.labelTranslations.hasOwnProperty('previousPage')) {
                this.previousPageLabel = this
                    .labelTranslations['previousPage'];
            } else {
                this.previousPageLabel = 'previous';
            }

            if (this.labelTranslations.hasOwnProperty('nextPage')) {
                this.nextPageLabel = this.labelTranslations['nextPage'];
            } else {
                this.nextPageLabel = 'next';
            }

            if (this.labelTranslations.hasOwnProperty('lastPage')) {
                this.lastPageLabel = this.labelTranslations['lastPage'];
            } else {
                this.lastPageLabel = 'last';
            }
        } else {
            this.firstPageLabel = 'first';
            this.previousPageLabel = 'previous';
            this.nextPageLabel = 'next';
            this.lastPageLabel = 'last';
        }
    }

}
