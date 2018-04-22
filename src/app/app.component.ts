import { Component } from '@angular/core';

import { DataService } from './data.service';
import { DataServiceModel } from './models/DataService.model'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {
    result: DataServiceModel;

    constructor(private _dataService: DataService) {
        this._dataService
            .getLatestTransaction()
            .subscribe(res => this.result = res[0]);
    }
}
