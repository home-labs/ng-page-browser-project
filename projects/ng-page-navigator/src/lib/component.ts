import {
    Component,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    ViewChild,
    AfterViewInit,
    SimpleChanges,
    SimpleChange
} from '@angular/core';
import {
    ActivatedRoute,
    Router
} from '@angular/router';
import { Subscription } from 'rxjs';

import { Pagination } from './pagination';
// import { NgForm } from '@angular/forms';


@Component({
    selector: 'page-navigator',
    templateUrl: './template.html',
    styleUrls: ['./style.sass']
})
export class PageNavigatorComponent
       implements
        OnInit,
        AfterViewInit,
        OnDestroy {

    @Input() queryParamPropertyName: string;
    @Input() labelTranslations: Object;
    @Input() enablePageNumberInputBox: boolean;
    @Input() widthGrowthToggleFactor: number;

    @Output() changePage: EventEmitter<number>;
    @Output() ngInit: EventEmitter<Pagination>;

    currentPageNumber: number;
    bondedPageNumber: number;
    maxlength: number;
    firstPageLabel: string;
    previousPageLabel: string;
    nextPageLabel: string;
    lastPageLabel: string;
    showCurrentPageNumberDisplay: boolean;
    showPageNumberInputBox: boolean;
    hiddenPageNumberInputBox: boolean;
    totalPages: number;

    private queryParamsSubscription: Subscription;
    private pagination: Pagination;
    private paginationSubscription: Subscription;

    private _pageNumberInputBox: ElementRef;
    @ViewChild('pageNumberInputBox')
    private set pageNumberInputBox(value: any) {
        this._pageNumberInputBox = value;

        if (value) {
            this.resizePageNumberInputBoxWidth();
        }
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.changePage = new EventEmitter();
        this.showCurrentPageNumberDisplay = true;
        this.hiddenPageNumberInputBox = true;
        this.showPageNumberInputBox = false;

        this.currentPageNumber = 1;
        this.bondedPageNumber = 1;
        this.maxlength = 1;

        this.pagination = new Pagination();

        this.ngInit = new EventEmitter();
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        // let
        //     totalPagesChanges: SimpleChange;

        // // só isso não resolveria já que se a quantidade de páginas atribuída for a mesma que a anterior, este método não será chamado
        // if (simpleChanges.hasOwnProperty('totalPages')) {
        //     totalPagesChanges = simpleChanges['totalPages'];
        //     if (!totalPagesChanges.firstChange) {
        //         this.reset();
        //     }
        // }

    }

    ngAfterViewInit() {

    }

    ngOnInit() {
        let
            currentPageNumber: number = 1;

        this.paginationSubscription = this.pagination.subscribreInTotalPages(
            (value: number) => {
                this.totalPages = value;

                if (currentPageNumber
                    && currentPageNumber == this.currentPageNumber) {
                    this.reset();
                }

                currentPageNumber = this.currentPageNumber;
            }
        );

        this.ngInit.emit(this.pagination);

        // relative to font size
        this.widthGrowthToggleFactor = 8.46;
        this.enablePageNumberInputBox = this.enablePageNumberInputBox || false;

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
    }

    ngOnDestroy() {
        if (this.queryParamsSubscription
            && this.queryParamsSubscription instanceof Subscription) {
            this.queryParamsSubscription.unsubscribe();
        }

        this.paginationSubscription.unsubscribe();
    }

    isOnFrontPage(): boolean {
        return this.currentPageNumber === 1;
    }

    isOnLastPage(): boolean {
        return this.currentPageNumber === this.pagination.totalPages;
    }

    getPreviousPage(): number {
        if (this.bondedPageNumber && this.bondedPageNumber > 0) {
            if (this.bondedPageNumber != this.currentPageNumber
                && this.bondedPageNumber < this.currentPageNumber) {
                return this.bondedPageNumber;
            }

            return this.currentPageNumber - 1;
        }

        return this.currentPageNumber;
    }

    getNextPage(): number {
        if (this.bondedPageNumber && this.bondedPageNumber > 0) {
            if (this.bondedPageNumber != this.currentPageNumber
                && this.bondedPageNumber > this.currentPageNumber) {
                return this.bondedPageNumber;
            }

            return this.currentPageNumber + 1;
        }

        return this.currentPageNumber;
    }

    navigateTo(pageNumber: number) {
        const
            pageNumberInputBox: HTMLInputElement = this._pageNumberInputBox.nativeElement;

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

        if (this.enablePageNumberInputBox) {
            pageNumberInputBox.value = `${this.currentPageNumber}`;
            this.resizePageNumberInputBoxWidth();
        }

    }

    enablesCurrentPageNumberDisplay() {
        if (this.enablePageNumberInputBox) {
            this.showPageNumberInputBox = false;
            this.showCurrentPageNumberDisplay = true;
            this.hiddenPageNumberInputBox = true;
        }
    }

    enablesPageNumberInputBox() {
        if (this.enablePageNumberInputBox) {
            this.showPageNumberInputBox = true;
            this.showCurrentPageNumberDisplay = false;
            this.hiddenPageNumberInputBox = false;
        }
    }

    onMouseOver() {
        const
            pageNumberInputBox: HTMLInputElement = this._pageNumberInputBox.nativeElement;

        pageNumberInputBox.focus();
    }

    resizePageNumberInputBoxWidth() {
        const
            pageNumberInputBox: HTMLInputElement = this._pageNumberInputBox.nativeElement,
            computedStyle = window.getComputedStyle(pageNumberInputBox),
            pageNumberInputBoxLength: number = pageNumberInputBox.value.length,
            minimalWidth: number = Number.parseFloat(computedStyle.borderLeftWidth) +
                Number.parseFloat(computedStyle.paddingLeft) +
                Number.parseFloat(computedStyle.borderRightWidth) +
                Number.parseFloat(computedStyle.paddingRight);

        pageNumberInputBox.style.width = `${minimalWidth + (pageNumberInputBoxLength * this.widthGrowthToggleFactor)}px`;
    }

    resolvePageNumberInput(event: KeyboardEvent) {
        // const
        //    eventTarget: any = event.currentTarget;

        // event.preventDefault();

        // console.log(event.key);

        // to do that following a logic, as event.key should be a number (use regular expression to test it) and eventTarget['value'] + event.key should be smaller than or equal to totalPages
        // ver problema ao selecionar e digitar, porque está sendo concatenado ao invés de substituir o que fora selecionado (ver como pegar o que fora selecionado para o caso)
        // eventTarget['value'] += event.keyCode;

        // this.resizePageNumberInputBoxWidth();
    }

    private reset() {
        this.currentPageNumber = 1;
        this.bondedPageNumber = this.currentPageNumber;
        this.maxlength = `${this.pagination.totalPages}`.length;
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

    private setMaxInputValidationMessage(input: HTMLInputElement) {
        // input.setCustomValidity(`Este campo deve ter o valor máximo de: ${this.totalPages}`);

        // const
        //     ngFrom: NgForm = input.form;
    }

}
