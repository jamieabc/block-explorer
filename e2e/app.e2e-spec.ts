import { AppPage } from './app.po';
import { DataServiceModel } from '../src/app/models/DataService.model';

describe('block-explorer App', () => {
    let page: AppPage;
    const defaultData: DataServiceModel = {
        block_number: 2,
        next_block_number: 3,
        block_hash: '00a9ff09086a66ad85b082e9f8f5b92d1c103ffedc6b61934a93a367bd4829b6',
        timestamp: 'Apr 10, 2018 03:36:53 PM',
        tx_id: 'd8b920f7d2925e74d2038d817118de3701bf980ce8f5e2e79d041bb283a6be59',
        asset_id: "069e77701064a7c2f2ca83255f63b1398f39eb085596e46ac428c3f6d26a7e025b385bb9015c07f381a115190e7000c3bf30f83b097880316e5e84b6976f905f"
    };

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display correct page', () => {
        page.waitForRootReady();
        expect(page.getBlockNumberText()).toEqual(`Block #${defaultData.block_number}`);
        expect(page.getNextBlockNumberText()).toEqual('' + defaultData.next_block_number);
    });

    it('should navigate to next block when link is clicked', () => {
        page.waitForRootReady();
        const nextBlockLink = element(by.id('next-block-number'));
        nextBlockLink.click();
        expect(page.getUrl()).toContain(`block/${defaultData.next_block_number}`);
    });

    // since page content is tested by unit test, check url should be sufficient
    it('should be original page if click link of next_block and prev_block', () => {
        page.waitForRootReady();
        const nextBlockLink = element(by.id('next-block-number'));
        nextBlockLink.click();
        const prevBlockLink = element(by.id('prev-block-number'));
        prevBlockLink.click();
        expect(page.getUrl()).toContain(`block/${defaultData.block_number}`);
    });

    // since page content is tested by unit test, check url should be sufficient
    it('should navigate to asset page if asset link is clicked', () => {
        page.waitForRootReady();
        const assetIdLink = element(by.id('asset-id'));
        assetIdLink.click();
        expect(page.getUrl()).toContain(`asset/${defaultData.asset_id}`);
    });
});
