import {
    Component
    , OnInit
    , OnDestroy
    , Input
    , Output
    , EventEmitter
    , ElementRef
    , ViewChild
    , AfterViewInit
    // , SimpleChanges
    // , SimpleChange
} from '@angular/core';

import {
    ActivatedRoute
    , Router
} from '@angular/router';

// import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ILabelTranslationsProperties } from '../i-label-transtations-properties';


@Component({
    selector: 'lib-page-browser',
    templateUrl: './template.html',
    styleUrls: ['./style.styl']
})
export class PageBrowserComponent

    implements
        OnInit,
        AfterViewInit,
        OnDestroy {

    @Input() labelTranslations: ILabelTranslationsProperties;

    @Input() enablePageNumberInputBox: boolean;

    @Input() queryParamPropertyName: string;

    @Input() widthGrowthToggleFactor: number;

    @Output() changePage: EventEmitter<number>;

    set totalPages(value: number) {
        this._totalPages = value;

        if (this.cachedPageNumber
            && this.cachedPageNumber === this.currentPageNumber) {
            this.reset();
        }

        this.cachedPageNumber = this.currentPageNumber;
    }

    get totalPages(): number {
        return this._totalPages;
    }

    currentPageNumber: number;

    cachedPageNumber: number;

    bondedPageNumber: number;

    maxlength: number;

    firstPageLabel: string | HTMLElement;

    previousPageLabel: string | HTMLElement;

    nextPageLabel: string | HTMLElement;

    lastPageLabel: string | HTMLElement;

    showCurrentPageNumberDisplay: boolean;

    hiddenPageNumberInputBox: boolean;

    private _totalPages: number;

    private queryParamsSubscription: Subscription;

    private pageNumberInputBox: ElementRef;
    @ViewChild('pageNumberInputBox', { static: false })
    private set _pageNumberInputBox(value: any) {
        this.pageNumberInputBox = value;

        if (value) {
            this.resizePageNumberInputBoxWidth();
        }
    }

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
        this._totalPages = 1;
        this.cachedPageNumber = 1;

        this.changePage = new EventEmitter();
        this.showCurrentPageNumberDisplay = true;
        this.hiddenPageNumberInputBox = true;

        this.currentPageNumber = 1;
        this.bondedPageNumber = 1;
        this.maxlength = 1;

        // relative to font size
        this.widthGrowthToggleFactor = 8.46;
        this.enablePageNumberInputBox = true;
        this.labelTranslations = {};
        this.queryParamPropertyName = '';

        this.firstPageLabel = '';
        this.previousPageLabel = '';
        this.nextPageLabel = '';
        this.lastPageLabel = '';

        this.queryParamsSubscription = null as any;
        this.pageNumberInputBox = null as any;
    }

    // ngOnChanges(simpleChanges: SimpleChanges) {
    //     let
    //         totalPagesChanges: SimpleChange;

    //     // só isso não resolveria já que se a quantidade de páginas atribuída for a mesma que a anterior, este método não será chamado
    //     if (simpleChanges.hasOwnProperty('totalPages')) {
    //         totalPagesChanges = simpleChanges['totalPages'];
    //         if (!totalPagesChanges.firstChange) {
    //             this.reset();
    //         }
    //     }
    // }

    ngAfterViewInit() {

    }

    ngOnInit() {
        this.queryParamsSubscription = this.route.queryParams.subscribe(
            (params: object) => {
                if (params.hasOwnProperty(this.queryParamPropertyName)) {
                    this.currentPageNumber = parseInt((params as any)[this.queryParamPropertyName]
                    , 10);
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
    }

    isOnFrontPage(): boolean {
        return this.currentPageNumber === 1;
    }

    isOnLastPage(): boolean {
        return this.currentPageNumber === this._totalPages;
    }

    getPreviousPage(): number {
        if (this.bondedPageNumber && this.bondedPageNumber > 0) {
            if (this.bondedPageNumber !== this.currentPageNumber
                && this.bondedPageNumber < this.currentPageNumber) {
                return this.bondedPageNumber;
            }

            return this.currentPageNumber - 1;
        }

        return this.currentPageNumber;
    }

    getNextPage(): number {
        if (this.bondedPageNumber && this.bondedPageNumber > 0) {
            if (this.bondedPageNumber !== this.currentPageNumber
                && this.bondedPageNumber > this.currentPageNumber) {
                return this.bondedPageNumber;
            }

            return this.currentPageNumber + 1;
        }

        return this.currentPageNumber;
    }

    navigate2(pageNumber: number) {
        const
            pageNumberInputBox: HTMLInputElement = this.pageNumberInputBox.nativeElement;

        this.bondedPageNumber = parseInt(`${pageNumber}`, 10);
        this.currentPageNumber = this.bondedPageNumber;

        if (this.queryParamPropertyName) {
            this.router.navigate([location.pathname],
                {
                    queryParams: this.getQueryParamsStatement(this.bondedPageNumber),
                    queryParamsHandling: 'merge'
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
            this.showCurrentPageNumberDisplay = true;
            this.hiddenPageNumberInputBox = true;
        }
    }

    enablesPageNumberInputBox() {
        if (this.enablePageNumberInputBox) {
            this.showCurrentPageNumberDisplay = false;
            this.hiddenPageNumberInputBox = false;
        }
    }

    onMouseOver() {
        const
            pageNumberInputBox: HTMLInputElement = this.pageNumberInputBox.nativeElement;

        pageNumberInputBox.focus();
    }

    resizePageNumberInputBoxWidth() {
        const pageNumberInputBox: HTMLInputElement = this.pageNumberInputBox.nativeElement;

        const computedStyle = window.getComputedStyle(pageNumberInputBox);

        const pageNumberInputBoxLength: number = pageNumberInputBox.value.length;

        const minimalWidth: number = Number.parseFloat(computedStyle.borderLeftWidth) +
            Number.parseFloat(computedStyle.paddingLeft) +
            Number.parseFloat(computedStyle.borderRightWidth) +
            Number.parseFloat(computedStyle.paddingRight);

        pageNumberInputBox.style.width = `${minimalWidth + (pageNumberInputBoxLength * this.widthGrowthToggleFactor)}px`;
    }

    private reset() {
        this.currentPageNumber = 1;
        this.bondedPageNumber = this.currentPageNumber;
        this.maxlength = `${this._totalPages}`.length;
    }

    private getQueryParamsStatement(pageNumber: number): object {
        const
            statement: object = {};

        (statement as any)[this.queryParamPropertyName] = pageNumber;

        return statement;
    }

    private resolveLabelTranslations() {
        if (Object.keys(this.labelTranslations).length) {
            if (this.labelTranslations.hasOwnProperty('firstPage')) {
                this.firstPageLabel = this.labelTranslations.firstPage as any;
            } else {
                this.firstPageLabel = 'first';
            }

            if (this.labelTranslations.hasOwnProperty('previousPage')) {
                this.previousPageLabel = this
                    .labelTranslations.previousPage as any;
            } else {
                this.previousPageLabel = 'previous';
            }

            if (this.labelTranslations.hasOwnProperty('nextPage')) {
                this.nextPageLabel = this.labelTranslations.nextPage as any;
            } else {
                this.nextPageLabel = 'next';
            }

            if (this.labelTranslations.hasOwnProperty('lastPage')) {
                this.lastPageLabel = this.labelTranslations.lastPage as any;
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

    // resolvePageNumberInput(event: KeyboardEvent) {
    //     // const
    //     //    eventTarget: any = event.currentTarget;

    //     // event.preventDefault();

    //     // console.log(event.key);

    //     // to do that following a logic, as event.key should be a number (use regular expression to test it) and eventTarget['value'] +
    //     // event.key should be smaller than or equal to totalPages ver problema ao selecionar e digitar, porque está sendo concatenado ao
    //     // invés de substituir o que fora selecionado (ver como pegar o que fora selecionado para o caso) eventTarget['value'] +=
    //     // event.keyCode;
    //     // this.resizePageNumberInputBoxWidth();
    // }

    // private setMaxInputValidationMessage(input: HTMLInputElement) {
    //     // input.setCustomValidity(`Este campo deve ter o valor máximo de: ${this.totalPages}`);

    //     // const
    //     //     ngFrom: NgForm = input.form;
    // }

}
