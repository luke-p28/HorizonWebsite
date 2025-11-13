import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
import getBestJob from './bestjob.js';
app.get('/jobdata', async (req, res) => {
    const jobData = await getBestJob();
    console.log("sending job data:", jobData);
    res.json(jobData);
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});