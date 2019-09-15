# NgPageBrowser

## Requirements

>- Angular 5 or higher.

## Installing

	$ npm i @rplaurindo/ng-page-browser --save

## Usage

Include the module into `imports` metadata key of `NgModule` decorator in your application, importing `NgPageBrowserModule` from `@rplaurindo/ng-page-browser`, like that.

```typescript
import { NgPageBrowserModule } from '@rplaurindo/ng-page-browser';

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
    firstPage: 'First',
    previousPage: '«',
    nextPage: '»',
    lastPage: 'Last'
  }"
  [enablePageNumberInputBox]="true || false"
  [queryParamPropertyName]="'page'"
  (changePage)="onChangePage($event)"
></lib-page-browser>
```

So...

```typescript
import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';

import { PageBrowserComponent } from '@rplaurindo/ng-page-browser';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

    @ViewChild('pageBrowser', { static: false }) private pageBrowser: PageBrowserComponent;

    enablePageNumberInputBox: boolean;

    collection: object[];

    pageNumber: number;

    limit: number;

    constructor() {
        this.enablePageNumberInputBox = true;
        this.collection = [];
        this.pageNumber = 1;
        this.limit = 5;

        const
            interval = setInterval(
                () => {
                    this.pageBrowser.totalPages = 1110;
                    for (let i = 1; i <= this.pageBrowser.totalPages * this.limit; i++) {
                        this.collection.push({
                            property1: `property1 value ${i}`
                            , property2: `property2 value ${i}`
                        });
                    }
                    console.log('function called after an interval');
                    clearInterval(interval);
                }, 2000
            );

    }

    ngOnInit() {

    }

    onChangePage(pageNumber: number) {
        this.pageNumber = pageNumber;
    }

}

```

**Note.**: 
>- don't use this component nested a HTML tag block with `*ngIf` directive if you is using an `Angular` last than 8 version, or it'll not work;
>- `enablePageNumberInputBox` is optional, if you set it, you'll can browse to a specific page, just clicking on the page number box to enable the page number input box (text input type) and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current). If you enable the page number input box you can set `widthGrowthToggleFactor` to define the width growth factor of the page number input box;
>- You can use the `getPage` pipe passing the page number and the limit to page inline a collection `(... | getPage:pageNumberVariable:limitVariable)`.


