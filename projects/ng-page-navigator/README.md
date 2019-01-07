# NgPageNavigator	

## Requirements

>- Angular 4 or higher.

## Installing

	$ npm i ng-page-navigator --save

## Usage

Include the module into `imports` metadata key of `NgModule` decorator in your application, importing `NgPageNavigatorModule` from `ng-page-navigator`, like that.

```typescript
import { NgPageNavigatorModule} from 'ng-page-navigator';

@NgModule({
    imports: [
        NgPageNavigatorModule
    ]
})
export class MyModule() { }
```

## Data and Event Binding

```html
<page-navigator
  [labelTranslations]="{
    firstPage: 'First',
    previousPage: '«',
    nextPage: '»',
    lastPage: 'Last'
  }"
  [enablePageNumberInputBox]="true || false"
  [widthGrowthToggleFactor]="8.46"
  (changePage)="methodToPageOfYourComponent($event)"
  (inInit)="onInitPagination($event)"
></page-navigator>
```

So in your component import `NgPageNavigator` and define `onInitPagination` method (or with another name of your taste) to receibes `Pagination` object to set `totalPages` when your component knows the total pages.

```typescript
import {
    Component
} from  '@angular/core';

import { NgPageNavigator} from 'ng-page-navigator';


@Component({
    // ...
})
export class MyComponent {

    private _pagination: NgPageNavigator.Pagination;

    constructor() {
	    const
		    interval  =  setInterval(
			    () => {
				    this._pagination.totalPages  =  100;
				    clearInterval(interval);

                }, 5000

            );
    }
	
    onInitPagination(pagination: NgPageNavigator.Pagination) {
	    this._pagination = pagination;
    }
	
}
```

**Note.**: `enablePageNumberInputBox` is optional, if you set it, you'll can browse to a specific page, just click on the page number box to enable the page number input box (text input type) and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current). If you enable `enablePageNumberInputBox` you can set `widthGrowthToggleFactor` to define the width growth factor of the page number input box.

