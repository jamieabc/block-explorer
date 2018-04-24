import { browser, by, element } from 'protractor';

export class AppPage {
    // get transaction block number
    getBlockNumberText() {
        return element(by.id('block-number')).getText();
    }

    // get next block number
    getNextBlockNumberText() {
        return element(by.id('next-block-number')).getText();
    }

    // get URL
    getUrl() {
        return browser.getCurrentUrl();
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
