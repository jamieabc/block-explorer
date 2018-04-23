import { browser, by, element } from 'protractor';

export class AppPage {
    // get transaction block number
    getBlockNumberText() {
        return element(by.id('block-number')).getText();
    }

    // get transaction hash
    getBlockHashText() {
        return element(by.id('block-hash')).getText();
    }

    // get transaction timestamp
    getBlockTimestampText() {
        return element(by.id('block-timestamp')).getText();
    }

    // get transaction tx_id
    getBlockTxIdText() {
        return element(by.id('block-tx-id')).getText();
    }

    // wait until get data from postgresql
    waitForRootReady() {
        browser.get('/');
        // only when data is ready, 'wrap' will be displayed, at most wait for 15 seconds
        browser.wait(() => {
            return element(by.id('wrap')).isPresent();
        }, 15000);
    }
}
