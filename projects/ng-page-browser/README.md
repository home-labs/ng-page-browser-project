# NgPageBrowser

## Requirements

>- @angular/common, @angular/core, @angular/forms and @angular/router 5 or higher;
>- rxjs 5 or higher.

## Installing

	$ npm i @actjs.on/ng-page-browser --save

## Usage

Include the module into `imports` metadata key of `NgModule` decorator in your application, importing `NgPageBrowserModule` from `@actjs.on/ng-page-browser`, like that.

```ts
import { NgPageBrowserModule } from '@actjs.on/ng-page-browser';

@NgModule({
    imports: [
        NgPageBrowserModule
    ]
})
export class MyModule() { }
```

## Data and Event Binding

```html
<lib-page-browser
  #pageBrowser
  [labelTranslations]="{
    firstPage: 'first',
    previousPage: '«',
    nextPage: '»',
    lastPage: 'last'
  }"
  [enablePageNumberInputBox]="enablePageNumberInputBox"
  [queryParamPropertyName]="'page'"
  (changePage)="onChangePage($event)"
></lib-page-browser>
```

So...

```ts
import {
    Component
    , OnInit,
    , ViewChild
} from '@angular/core';

import {
    PageBrowserComponent
    , NgPageBrowser
} from '@actjs.on/ng-page-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: true }) private pageBrowser: PageBrowserComponent;

    protected pageNumber: number;

    protected limit: number;

    protected collectionPromise: Promise<object[]>;

    protected enablePageNumberInputBox: boolean;

    private collection: object[];

    private count: number;

    constructor() {
        this.limit = 5;
        this.enablePageNumberInputBox = true;
        this.collection = [];
    }

    async ngOnInit() {

        await this.getPage();

        this.pageBrowser.totalPages = NgPageBrowser.Pagination
            .calculatesTotalPages(this.count, this.limit);
    }

    onChangePage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

    getPage(): Promise<object[]> {
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
```

### Directives

Selector: `lib-page-browser`
Exported as:  `NgPageBrowser.PageBrowserComponent`

#### Properties


Name|Description
--|--
|@Input()<br/>labelTranslations: ILabelTranslationsProperties|Optional. A literal object to define control labels.|
|@Input()<br/>enablePageNumberInputBox: boolean|Optional. A text box to insert the page number to jump to any page in the page range.|
|@Input()<br/>queryParamPropertyName: string|Optional. Define the name of query param property.|
|@Input()<br/>widthGrowthToggleFactor: number|Optional. A number that represents the growth factor of the page number input text box.|
|@Output<br/>changePage: EventEmitter<number>|Optional. Callback function to inform what's the number of current page.|


**Note.**: 
>- don't use this component nested a HTML tag block with `*ngIf` directive if you is using an `Angular` last than 8 version, or it'll not work;
>- `enablePageNumberInputBox` is optional, if you set it, you'll can browse to a specific page, just clicking on the page number box to enable the page number input box (text input type) and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current). If you enable the page number input box you can set `widthGrowthToggleFactor` to define the width growth factor of the page number input box;
>- You can use the `getPagePer` pipe passing the page number and the limit to page a collection `(... | getPagePer:pageNumberVariable:limitVariable)` inline.
