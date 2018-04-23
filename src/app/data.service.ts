import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { DataServiceModel } from './models/DataService.model';


@Injectable()
export class DataService {

    result: DataServiceModel[];

    imports: [
        Http
    ];

    constructor(private _http: Http) {}

    getLatestTransaction() {
        const transaction = this._http.get('http://localhost:3000/api/latest_transaction');
        return transaction.map(data => this.result = data.json());
    }
}
