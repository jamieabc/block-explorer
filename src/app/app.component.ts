import { Component } from '@angular/core';

import { DataService } from './data.service';
import { DataServiceModel } from './models/DataService.model'

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
}
