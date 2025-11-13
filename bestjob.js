import getJobData from './crawl.js';
const outlookOrder = ['Very good','Good','Moderate','Limited','Very limited','Varies'];
async function getBestJob() {
    const jobData = await getJobData();
    console.log('All job data retrieved:', jobData);
    // Find the job with the highest outlook
    const bestJob = jobData.reduce((prev, current) => {
        console.log('Comparing jobs:', prev, current);
        if (!prev || outlookOrder.indexOf(current.outlook) < outlookOrder.indexOf(prev.outlook)) {
            return current;
        } else if (outlookOrder.indexOf(current.outlook) === outlookOrder.indexOf(prev.outlook)) {
            // If outlooks are equal, compare wages
            return current.wage > prev.wage ? current : prev;
        } else {
            return prev;
        }
    });
    console.log('Best job found:', bestJob);
    return bestJob;
}
console.log('Starting best job retrieval');
getBestJob().then(console.log);
console.log('Best job module loaded');
export default getBestJob;
console.log('Best job module exported');