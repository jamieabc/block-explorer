import { Component } from '@angular/core';

import { DataService } from './data.service';
import { DataServiceModel } from './models/DataService.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {
    result: {
        showTransaction: boolean;
        data: DataServiceModel[];
    };

    // offset: how many records has been got
    // limit: how many records to get per ajax query
    query: {
        offset: number,
        limit: number
    } = {
        offset: 0,
        limit: 10
    };

    endOfData: boolean = false;
    querying: boolean = false;

    constructor(private _dataService: DataService) {
        this.result = {
            showTransaction: false,
            data: []
        };

        const parsedUrl = new URL(window.location.href);
        const { pathname } = parsedUrl;
        const [ category, resourceId ] = pathname.split('/');

        // should use router for transaction page, but not familiar with it
        // handle it manually
        const showTransaction = !!(parsedUrl.pathname.match(/\/transaction\/\d+/));

        this._dataService
            .getData(parsedUrl)
            .subscribe(res => {
                this.result.data = res;
                this.result.showTransaction = showTransaction;
            });
    }

    loadMoreTransactions() {
        const parsedUrl = new URL(window.location.href);
        const { offset, limit } = this.query;
        const blockNumber = this.result.data[0].tx_block_number;

        if (!this.endOfData && !this.querying) {
            this.querying = true;
            this._dataService
                .getMoreTransactions(
                    parsedUrl,
                    offset,
                    limit,
                    blockNumber)
                .subscribe(res => {
                    // not enough data, end of query
                    if (res.length < this.query.limit) {
                        this.endOfData = true;
                    }

                    // as long as data exist, store it
                    if (res.length) {
                        const newArr = this.result.data.concat(res);
                        this.result.data = newArr;
                    }
                    this.querying = false;
                });

            this.query.offset += limit;
        }
    }
}
