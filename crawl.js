import { randomInt } from 'crypto';
import fs from 'fs';
import path from 'path';
import { analyseHTML } from './analysehtml.js';
import puppeteer from 'puppeteer';

// URL can be overridden with the environment variable URL for testing:
let url = process.env.URL || 'https://www.jobbank.gc.ca/marketreport/summary-occupation/5432/ON';

// Output file will be placed in the workspace root (one level up from this file)
const outName = 'output/output';
const outPath = "./"+outName;

async function fetchAndSave(attemptsLeft = 3, i) 
    console.log(`Fetching ${url} (attempts left: ${attemptsLeft}, i: ${i})`);
    try {
        console.log('Sending request to', url);
        // const response = await axios.get(url, {
        //     headers: {
        //         'User-Agent': 'Mozilla/5.0 (compatible; Node.js script)',
        //         'Accept': 'text/html',
        //     },
        //     responseType: 'text',
        // });
        // console.log('Request succeeded with status', response.status);
        // const html = response.data;
        // const $ = cheerio.load(html);
        // const fullHtml = $.html();
        const browser = await puppeteer.launch();
        console.log('Browser launched');
        const page = await browser.newPage();
        console.log('New page created');
        let retries = 3;
        while (retries > 0) {
            try {
            await page.goto(url, {timeout: 60000});
            break;
            } catch (error) {
                console.error('Error navigating to the page:', error, 'Retries left:', retries - 1);
                retries--;
            }
            }
        const content = await page.content();
        console.log(content);
        await browser.close();
        console.log('Fetched HTML length:', content.length);
        fs.writeFileSync(outPath+i+'.html', content, 'utf8');
        console.log('i: ' + i);
        console.log('Saved HTML to', outPath+i+'.html');
    } catch (err) {
        // Log brief error
        console.error('Request failed:', err.code || err.message);

        // If the server responded with something, save it for debugging
        if (err.response && err.response.data) {
            const errPath = path.join(__dirname, '..', 'error_response.html');
            try {
                fs.writeFileSync(errPath, err.response.data, 'utf8');
                console.log('Saved error response to', errPath);
            } catch (e) {
                console.error('Failed to save error response:', e.message);
            }
        }

        if (attemptsLeft > 1) {
            console.log('Retrying in 5s...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            await fetchAndSave(attemptsLeft - 1, i);
        } else {
            console.error('All retries failed.');
            console.log('i: ' + i);
            console.log('Saved HTML to', outPath+i+'.html');
            fs.writeFileSync(outPath+i+'.html', '', 'utf8');
            return;
        }
    }
}

async function getJobData(refresh = false) {
    if (!fs.existsSync('./output'))
        fs.mkdirSync('./output');
    let jobData = [];
    for (let i = 0; i < 10; i++) {
        if (refresh){
            url = process.env.URL || 'https://www.jobbank.gc.ca/marketreport/summary-occupation/' + randomInt(1000,9999) + '/ON';
            console.log('Crawling URL:',url);
            await fetchAndSave(3,i);
        }
        console.log('Analysing output' + i + '.html');
        try {
            const newData = await analyseHTML(i);
            if (newData && newData.category) {
                jobData.push(newData);
            }
        } catch (err) {
            console.log('Error analysing HTML for output' + i + '.html:', err);
        }
    }
    return jobData;
}
export default getJobData;
if (process.argv[2] === 'crawl') {
   getJobData(true).then(console.log);
} else {
    console.log('Not crawling. To crawl, run with argument "crawl".');
}
