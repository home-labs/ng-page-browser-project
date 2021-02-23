import {
    Pipe
    , PipeTransform
} from '@angular/core';

import { Pagination } from '../pagination';


@Pipe({
    name: 'getPagePer'
})
export class GetPagePerPipe implements PipeTransform {

    private pagination!: Pagination<any>;

    constructor() {

    }

    transform(data: any[], limit?: number, pageNumber: number = 1): any[] {

        let page: any[];

        if (data) {
            if (this.pagination) {
                this.pagination.setLimit(limit as number);
            } else {
                this.pagination = new Pagination(data, limit as number);
            }

            page = this.pagination.getPage(pageNumber);

            return page;
        }

        return [];

    }

}
