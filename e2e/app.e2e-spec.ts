import { AppPage } from './app.po';
import { DataServiceModel } from '../src/app/models/DataService.model';

describe('block-explorer App', () => {
    let page: AppPage;
    const defaultData: DataServiceModel = {
        block_number: 6758,
        next_block_number: 6759,
        block_hash: '00330d68cbaf19cd50bc5c14503a285e846dd460d9bad97519f04919fc122e1f',
        timestamp: 'Apr 19, 2018 11:21:57 AM',
        tx_id: '478e808284c5bf65992ea059e3057f9c30823371623ecfedb06e326715a919f1',
        asset_id: "762667b3ab53d202d87e3ae3a57fc48cf56b722e429eca664fbcfe933b9a1cbc8e95ca5d06861e20878aed9c8b63c3da8ea569bfcc10327804358a3ba21b8b33"
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
