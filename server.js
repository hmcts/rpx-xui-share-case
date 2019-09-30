const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

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
var s2sTokenCCD;
var ccdBody;

app.post('/test1', (req, res, next) => {
    console.log(req);
    console.log('REQUEST BODY: ',req.body);
    ccdHeader = req.headers;
    ccdBody = req.body;
    authorizationToken = req.headers.authorization;
    s2sTokenCCD = req.headers.serviceauthorization;
    res.send(ccdHeader);

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
var output1;
var output2;
var output3;

app.get('/test2', (req, res, next) => {
console.log(ccdHeader);
  output1 = JSON.stringify(ccdHeader);
  output2 = JSON.stringify(ccdBody);
  output3 = output1 + output2;
    res.send(output3);
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

