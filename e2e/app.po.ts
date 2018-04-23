import { browser, by, element } from 'protractor';

export class AppPage {
    getBlockNumberText() {
        return element(by.id('block-number')).getText();
    }

    getBlockHashText() {
        return element(by.id('block-hash')).getText();
    }

    getBlockTimestampText() {
        return element(by.id('block-timestamp')).getText();
    }

    getBlockTxIdText() {
        return element(by.id('block-tx-id')).getText();
    }

    waitForRootReady() {
        browser.get('/');
        browser.wait(() => {
            return element(by.id('wrap')).isPresent();
        }, 10000);
    }
}
