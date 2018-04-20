import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    result: any;

    constructor(private _http: Http) {}

    getLatestTransaction() {
        const transaction = this._http.get('/api/latest_transaction');
        return transaction.map(data => this.result = data.json());
    }

}
