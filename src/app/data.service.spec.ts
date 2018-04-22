import { TestBed, inject } from '@angular/core/testing';
import { Http } from '@angular/http';

import { DataService } from './data.service';

describe('DataService', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let dataService: DataService;

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
        dataService = new DataService(<any> httpClientSpy);
    });

    it('should be created', () => {
        httpClientSpy.get.and.returnValue({});
        expect(dataService).toBeTruthy();
    });
});
