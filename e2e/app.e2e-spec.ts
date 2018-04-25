import { AppPage } from './app.po';
import { DataServiceModel } from '../src/app/models/DataService.model';

describe('block-explorer App', () => {
    let page: AppPage;
    const defaultData: DataServiceModel = {
        block_number: 6762,
        next_block_number: 6763,
        block_hash: '00bb63fedc40b80664df4b84b748c41adf47fd439ab8ed297c8f178fedc7292c',
        timestamp: 'Apr 19, 2018 11:21:57 AM',
        tx_id: '739c580666bfcb4dc598b41b83ec244f189d2e7cf0b6e1bfa6f2f673b3ff1521',
        asset_id: null
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
        const prevBlockLink = element(by.id('prev-block-number'));
        prevBlockLink.click();
        const nextBlockLink = element(by.id('next-block-number'));
        nextBlockLink.click();
        expect(page.getUrl()).toContain(`block/${defaultData.block_number}`);
    });
});
