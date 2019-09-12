# NgPageBrowser

## Requirements

>- Angular 5 or higher.

## Installing

	$ npm i ng-page-browser --save

## Usage

Include the module into ```imports``` metadata key of ```NgModule``` decorator in your application, importing ```NgPageBrowserModule``` from `ng-page-browser`, like that.

```typescript
import { NgPageBrowserModule } from 'ng-page-browser';

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
  (changePage)="onChangePage($event)"
></lib-page-browser>
```

So...

```typescript
import {
    Component,
    OnInit,
    ViewChild
} from  '@angular/core';

import { PageBrowserComponent } from 'ng-page-browser';


@Component({
    // ...
})
export class MyComponent implements OnInit {

    @ViewChild('pageBrowser') private  pageBrowser: PageBrowserComponent;

    constructor() {
        const
            // example to assign totalPages belatedly
            interval = setInterval(
                () => {
                    this.pageBrowser.totalPages = 100;
                    clearInterval(interval);
                }, 2000
            );
    }

	onChangePage(pageNumber:  number) {
	    
	}

}
```

**Note.**: 
>- don't use this component nested a HTML tag block with `*ngIf` directive, or it'll not work;
>- `enablePageNumberInputBox` is optional, if you set it, you'll can browse to a specific page, just clicking on the page number box to enable the page number input box (text input type) and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current). If you enable the page number input box you can set `widthGrowthToggleFactor` to define the width growth factor of the page number input box.

