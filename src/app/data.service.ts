import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { DataServiceModel } from './models/DataService.model';
import { UrlModel } from './models/Url.model';


@Injectable()
export class DataService {

    result: DataServiceModel[];

    imports: [
        Http
    ];

    constructor(private _http: Http) {}

    getData(parsedUrl: UrlModel) {
        const { hostname, pathname } = parsedUrl;
        const [ prefix, category, resourceId, indicator ] = pathname.split('/');
        let transaction;

        if (category.includes('asset')) {
            // get info by asset id
            transaction =
                this._http
                .get(`http://${hostname}:3000/api/asset/${resourceId}`);
        } else if (category === 'block') {
            // get transaction(s) in a block
            transaction =
                this._http
                .get(`http://${hostname}:3000/api/block/${resourceId}/${indicator}`);

        } else if (pathname.match(/^\/transaction\/\d+/)) {
            // get info by transaction id
            transaction =
                this._http
                .get(`http://${hostname}:3000/api/transaction/${resourceId}`);
        } else {
            // get transaction of latest block
            transaction =
                this._http
                .get(`http://${hostname}:3000/api/block/transactions`);
        }

        return transaction.map(data => this.result = data.json());
    }

    getMoreTransactions(parsedUrl: UrlModel, offset: number, limit: number, blockNumber: string) {
        const { hostname, pathname } = parsedUrl;
        const [ prefix, category, resourceId, indicator ] = pathname.split('/');

        const host = `http://${hostname}:3000`;
        const urlPath = `/api/block/${resourceId ? resourceId : blockNumber}/transactions`;
        const query = `?limit=${limit}&offset=${offset}`;

        const transaction =
            this._http
            .get(host + urlPath + query);

        return transaction.map(data => this.result = data.json());
    }
}
