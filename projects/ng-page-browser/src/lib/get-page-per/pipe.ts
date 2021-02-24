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

    transform(collecttion: any[], limit?: number, pageNumber: number = 1): any[] {

        let page: any[];

        if (!collecttion.length) {
            return collecttion;
        }

        if (this.pagination) {
            this.pagination.setLimit((limit)!);
        } else {
            this.pagination = new Pagination(collecttion, (limit)!);
        }

        page = this.pagination.getPage(pageNumber);

        return page;

    }

}
