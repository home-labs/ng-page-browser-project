import {
    Subject,
    Subscription
} from "rxjs";

export class Pagination {

    private _totalPages: number;
    private totalPagesSubscription: Subject<number>;

    set totalPages(value: number) {
        this._totalPages = value;
        this.totalPagesSubscription.next(value);
    }

    get totalPages(): number {
        return this._totalPages;
    }

    constructor() {
        this._totalPages = 1;

        this.totalPagesSubscription = new Subject();
    }

    subscribre2ReciveTotalPages(callback: Function): Subscription {
        return this.totalPagesSubscription.subscribe(callback as any);
    }

}
