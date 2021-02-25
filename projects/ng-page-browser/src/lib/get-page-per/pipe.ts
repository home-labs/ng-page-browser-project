import {
    Pipe
    , PipeTransform
} from '@angular/core';

import { Pagination } from '../pagination';


@Pipe({
    name: 'getPagePer'
})
export class GetPagePerPipe implements PipeTransform {

    private pagination!: Pagination<Object>;

    constructor() {

    }

    transform<T extends Object>(collecttion: T[], limit?: number, pageNumber: number = 1): T[] {

        let page: T[];

        if (!collecttion || !collecttion.length) {
            return [];
        }

        if (this.pagination) {
            this.pagination.setLimit((limit)!);
        } else {
            this.pagination = new Pagination(collecttion, (limit)!);
        }

        page = this.pagination.getPage(pageNumber) as T[];

        return page;

    }

}
