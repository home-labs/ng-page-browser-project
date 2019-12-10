import {
    Pipe,
    PipeTransform
} from '@angular/core';

import { Pagination } from '../pagination';


@Pipe({
    name: 'getPagePer'
})
export class GetPagePerPipe implements PipeTransform {

    private pagination: Pagination<any>;

    constructor() {

    }

    transform(data: any[], pageNumber: number, limit?: number): any[] {

        if (this.pagination) {
            this.pagination.setLimit(limit);
        } else {
            if (data) {
                this.pagination = new Pagination(data, limit);
            } else {
                return [];
            }
        }

        return this.pagination.getPage(pageNumber);
    }

}
