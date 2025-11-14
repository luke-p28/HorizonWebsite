import express from 'express';
const app = express();
app.get("/", (req, res) => {
    res.sendFile("./site/style.css", { root: '.' });
});
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
fetch('http://localhost:3000/').then(response => response.text()).then(data => console.log(data));