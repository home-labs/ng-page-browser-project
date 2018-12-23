# NgPageNavigator	

## Requirements

>- Angular 4 or higher.

## Installing

	$ npm i ng-page-navigator --save

## Usage

Include the module into ```imports``` metadata key of ```NgModule``` decorator in your application, importing ```NgPageNavigatorModule``` from ```ng-page-navigator```, like that.

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
  [totalPages]=10
  [labelTranslations]="{
    firstPage: '⏮',
    previousPage: '<<',
    nextPage: '>>',
    lastPage: '⏭'
  }"
  (changePage)="methodToPageOfYourComponent($event)"
></page-navigator>
```

**Note.**: you can browse to a specific page, just type the page number at page number box and clicking in previous page button (if the page number is smaller than current) or next page button (if the page number is bigger than current).

