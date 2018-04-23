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
        const domain = window.location.href.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/)[0];
        const transaction = this._http.get(`${domain}:3000/api/latest_transaction`);
        return transaction.map(data => this.result = data.json());
    }
}
