const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('App is running');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});


app.get('/test1', (req, res, next) => {
    console.log(req.headers);
    res.json(['Test1','Test2','Test3','Test4','Test5']);
});
