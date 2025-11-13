import puppeteer from 'puppeteer';
(async () => {
 const browser = await puppeteer.launch();
 console.log('Browser launched');
 const page = await browser.newPage();
 console.log('New page created');
 let retries = 3;
 while (retries > 0) {
    try {
    await page.goto('https://www.jobbank.gc.ca/marketreport/summary-occupation/3363/ON', {timeout: 60000});
    break;
    } catch (error) {
        console.error('Error navigating to the page:', error, 'Retries left:', retries - 1);
        retries--;
    }
    }
 const content = await page.content();
 console.log(content);
 await browser.close();
})();