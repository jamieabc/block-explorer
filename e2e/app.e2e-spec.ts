import { AppPage } from './app.po';

describe('block-explorer App', () => {
    let page: AppPage;
    const defaultData: {
        block_number: string;
        block_hash: string;
        timestamp: string;
        tx_id: string;
    } = {
        block_number: '2',
        block_hash: '00a9ff09086a66ad85b082e9f8f5b92d1c103ffedc6b61934a93a367bd4829b6',
        timestamp: 'Apr 10, 2018 03:36:53 PM',
        tx_id: 'd8b920f7d2925e74d2038d817118de3701bf980ce8f5e2e79d041bb283a6be59'
    };

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display correct page', () => {
        page.waitForRootReady();
        expect(page.getBlockNumberText()).toEqual(`Block #${defaultData.block_number}`);
        expect(page.getBlockHashText()).toEqual(defaultData.block_hash);
        expect(page.getBlockTimestampText()).toEqual(defaultData.timestamp);
        expect(page.getBlockTxIdText()).toEqual(defaultData.tx_id);
    });
});
