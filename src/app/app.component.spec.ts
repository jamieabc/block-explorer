import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { DataServiceModel } from './models/DataService.model';
import { HttpModule,
         Http,
         Response,
         ResponseOptions,
         XHRBackend
       } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { of } from 'rxjs/observable/of';

describe('AppComponent', () => {

    // test data
    const defaultData: DataServiceModel[] = [{
        tx_id: "d8b920f7d2925e74d2038d817118de3701bf980ce8f5e2e79d041bb283a6be59",
        tx_owner: "eZRyqVU5P9oxrcahd5CCyWthRcAXcFCsjjAm6U1gtmjqGkyxFV",
        tx_sequence: "4",
        tx_signature: "c6be2b8ec5c52332c7f5e08c22f770d2a652a28af9d4af84221a246ddfbddb56244d64f22bc8abe92ec5018749af16764f946c0f4cca31f959294a486018b40f",
        tx_countersignature: "",
        tx_asset_id: "069e77701064a7c2f2ca83255f63b1398f39eb085596e46ac428c3f6d26a7e025b385bb9015c07f381a115190e7000c3bf30f83b097880316e5e84b6976f905f",
        tx_bitmark_id: "4a8c4445afff9202b7c4d6c07477164d83fb480697eb99dc72ed066f958b026c",
        tx_previous_id: "4a8c4445afff9202b7c4d6c07477164d83fb480697eb99dc72ed066f958b026c",
        tx_head: "head",
        tx_status: "confirmed",
        tx_payments: null,
        tx_pay_id: "",
        tx_block_number: "3",
        tx_block_offset: "1",
        tx_expires_at: null,
        tx_modified_at: "2018-04-10T07:36:53.629Z",
        asset_id: "069e77701064a7c2f2ca83255f63b1398f39eb085596e46ac428c3f6d26a7e025b385bb9015c07f381a115190e7000c3bf30f83b097880316e5e84b6976f905f",
        asset_name: "non-deterministic asset",
        asset_fingerprint: "randomisedagain",
        asset_metadata: {
            description: "not possible at this time"
        },
        asset_registrant: "eg8bfYhHH68kwwrXUHHyJx29ovPdHYXUD2Qz8Yr31vGo93tdDo",
        asset_sequence: "1",
        asset_signature: "1350a77df9ec0dd849ec2e7e79d6854b2f21db5891986351117f9386488f7e3fd5ccf19c3af8114dd03f2e9a1fe5fe1912f7385b0aa3fe8a3f72ce04839e6902",
        asset_status: "confirmed",
        asset_block_number: "2",
        asset_block_offset: "1",
        asset_expires_at: null,
        block_number: 2,
        next_block_number: 3,
        prev_block_number: 1,
        block_hash: "00a9ff09086a66ad85b082e9f8f5b92d1c103ffedc6b61934a93a367bd4829b6",
        block_created_at: "2016-10-28T09:58:54.000Z",
        timestamp: "Apr 10, 2018 03:36:53 PM"
    }];

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function SleepForASecond() {
        await sleep(1050);
    }

    beforeEach(async(() => {
        // create testing module
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [ HttpModule ],
            providers: [
                DataService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        }).compileComponents();

        // mock http response from DataService
        const dataService: DataService = TestBed.get(DataService);
        spyOn(dataService, 'getData').and
            .returnValue(of(defaultData));
        spyOn(dataService, 'getMoreTransactions').and
            .returnValue(of(defaultData));
    }));

    it('should create the app', async(() => {
        const component: AppComponent = TestBed.createComponent(AppComponent).componentInstance;
        expect(component).toBeTruthy();
    }));

    it('should render title with block number', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#block-number').textContent)
            .toContain(`#${defaultData[0].block_number}`);
    }));

    it('should render correct data', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;

        // block hash
        expect(compiled.querySelector('#block-hash').textContent)
            .toContain(`${defaultData[0].block_hash}`);

        // tx modified timestamp
        expect(compiled.querySelector('#tx-timestamp').textContent)
            .toContain(`${defaultData[0].timestamp}`);

        // tx id
        expect(compiled.querySelector('#tx-id-0').textContent)
            .toContain(`${defaultData[0].tx_id}`);

        // block offset
        expect(compiled.querySelector('#block-offset').textContent)
            .toContain(`${defaultData[0].tx_block_offset}`);

        // signature
        expect(compiled.querySelector('#asset-signature').textContent)
            .toContain(`${defaultData[0].asset_signature}`);

        // asset id
        const assetId = compiled.querySelector('#asset-id');
        expect(assetId.textContent)
            .toContain(`${defaultData[0].asset_id}`);
        expect(assetId.tagName).toEqual('A');

        // sequence
        expect(compiled.querySelector('#asset-sequence').textContent)
            .toContain(`${defaultData[0].asset_sequence}`);

        // name
        expect(compiled.querySelector('#asset-name').textContent)
            .toContain(`${defaultData[0].asset_name}`);

        // status
        expect(compiled.querySelector('#asset-status').textContent)
            .toContain(`${defaultData[0].asset_status}`);

        // next block number
        const nextBlockNumber = compiled.querySelector('#next-block-number');
        expect(nextBlockNumber.textContent)
            .toContain(`${defaultData[0].next_block_number}`);
        expect(nextBlockNumber.tagName).toEqual('A');

        // prev block number
        const prevBlockNumber = compiled.querySelector('#prev-block-number');
        expect(prevBlockNumber.textContent)
            .toContain(`${defaultData[0].prev_block_number}`);
        expect(prevBlockNumber.tagName).toEqual('A');
    }));

    it('should more transaction when #loadMoreTransactions is called', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;
        const compiled = fixture.debugElement.nativeElement;

        // only one transaction exist
        fixture.detectChanges();
        expect(compiled.querySelector('#tx-id-1')).toBeFalsy();

        component.endOfData = false;

        component.loadMoreTransactions();
        const originalOffset: number = component.query.offset;
        fixture.detectChanges();

        // after loading more transactions, two transactions exist
        expect(compiled.querySelector('#tx-id-1')).toBeTruthy();
        expect(compiled.querySelector('#tx-id-2')).toBeFalsy();
    });
});
