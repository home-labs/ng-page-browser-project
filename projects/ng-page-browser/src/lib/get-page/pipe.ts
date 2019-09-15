import {
    Pipe,
    PipeTransform
} from '@angular/core';

import { Pagination } from '../pagination';


@Pipe({
    name: 'getPage'
})
export class GetPagePipe implements PipeTransform {

    private pagination: Pagination<any>;

    constructor() {

    }

    transform(collection: any[], pageNumber: number, limit: number): any[] {

        if (collection) {
            if (!this.pagination) {
                this.pagination = new Pagination(collection, limit);
            } else {
                this.pagination.setLimit(limit);
            }

            return this.pagination.getPage(pageNumber);
        }

        return collection;

    }

}
