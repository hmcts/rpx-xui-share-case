const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
    res.send('App is running');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

var ccdHeader;
var authorizationToken;
var s2sTokenCCD

app.post('/test1', (req, res, next) => {
    console.log(req.headers);
    ccdHeader = req;
    authorizationToken = req.headers.authorization;
    s2sTokenCCD = req.headers.serviceauthorization;
    res.sendStatus(200);

});

/*
const ccdGetUserToken = async (ccdPath) => {

    const response = axios.get(ccdPath)
        .then(function (response) {
            // handle success
            console.log(response);
        })

    return response;
};

*/

app.get('/test2', (req, res, next) => {
    console.log(req.headers);

    res.send(ccdHeader);
});

/*
app.get('/incomingToken', (req, res, next) => {

    // Firstly get ServiceAuthorization
    const authroization = req.headers.Authorization;
    // const authroization = req.headers.ServiceAuthorization;
    console.log(req.headers);

    //

});
*/

