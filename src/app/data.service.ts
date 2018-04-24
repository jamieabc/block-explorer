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
        const { pathname } = parsedUrl;
        const [ prefix, category, resourceId ] = pathname.split('/');
        let transaction;

        if (['asset', 'block'].includes(category)) {
            transaction =
                this._http
                .get(`http://${parsedUrl.hostname}:3000/api/${category}/${resourceId}`);
        } else {
            transaction =
                this._http
                .get(`http://${parsedUrl.hostname}:3000/api/latest_transaction`);
        }

        return transaction.map(data => this.result = data.json());
    }
}
