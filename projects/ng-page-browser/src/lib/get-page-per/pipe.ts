import {
    Pipe
    , PipeTransform
} from '@angular/core';

import { Pagination } from '../pagination';


@Pipe({
    name: 'getPagePer',
    pure: false
})
export class GetPagePerPipe implements PipeTransform {

    private pagination: Pagination<any> | undefined;

    constructor() {

    }

    transform(data: any[], limit?: number, pageNumber: number = 1): any[] {
    // async transform(data: any[], limit?: number, pageNumber: number = 1): Promise<any[]> {

        const promise: Promise<any[]> = new Promise(
            (accomplish: (collection: object[]) => void) => {
                if (data) {
                    if (this.pagination) {
                        this.pagination.setLimit(limit as number);
                    } else {
                        this.pagination = new Pagination(data, limit as number);
                    }

                    accomplish(this.pagination.getPage(pageNumber));
                } else {
                    accomplish([]);
                }

            }
        );

        let page: any[];

        // return promise;

        if (data) {
            if (this.pagination) {
                this.pagination.setLimit(limit as number);
            } else {
                this.pagination = new Pagination(data, limit as number);
            }

            page = this.pagination.getPage(pageNumber);
            debugger
            return page;
        }

        return [];

    }

}
