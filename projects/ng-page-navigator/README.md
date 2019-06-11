# NgPageNavigator	

## Requirements

>- Angular 4 or higher.

## Installing

	$ npm i ng-page-navigator --save

## Usage

Include the module into `imports` metadata key of `NgModule` decorator in your application, importing `NgPageNavigatorModule` from `ng-page-navigator`, like that.

```typescript
import { NgPageNavigatorModule } from 'ng-page-navigator';

@NgModule({
    imports: [
        NgPageNavigatorModule
    ]
})
export class MyModule() { }
```

## Data and Event Binding

```html
<lib-page-navigator
  #pageNavigator
  [labelTranslations]="{
    firstPage: 'First',
    previousPage: '«',
    nextPage: '»',
    lastPage: 'Last'
  }"
  [enablePageNumberInputBox]="true || false"
  [widthGrowthToggleFactor]="8.46"
  (changePage)="onChangePage($event)"
></lib-page-navigator>
```

So...

```typescript
import {
    Component,
    OnInit,
    ViewChild
} from  '@angular/core';

import { NgPageNavigator } from 'ng-page-navigator';


@Component({
    // ...
})
export class MyComponent implements OnInit {

    @ViewChild('pageNavigator') private  pageNavigator:  NgPageNavigator.Components.PageNavigatorComponent;

    constructor() {
        const
            // example to assign totalPages belatedly
            interval: NodeJS.Timer = setInterval(
                () => {
                    this.pageNavigator.totalPages = 100;
                    clearInterval(interval);
                }, 2000
            );
    }

	onChangesPage(pageNumber:  number) {
	    
	}

}
```

**Note.**: 
>- don't use this component nested a HTML tag block with `*ngIf` directive, or it'll not work;
>- `enablePageNumberInputBox` is optional, if you set it, you'll can browse to a specific page, just clicking on the page number box to enable the page number input box (text input type) and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current). If you enable the page number input box you can set `widthGrowthToggleFactor` to define the width growth factor of the page number input box.

