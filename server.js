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
var mockedResponse;

app.post('/test1', (req, res, next) => {
    console.log(req);
    console.log('REQUEST BODY: ',req.body);
    ccdHeader = req.headers;
    ccdBody = req.body;
    authorizationToken = req.headers.authorization;
    s2sTokenCCD = req.headers.serviceauthorization;

    mockedResponse = {
          "data": {
            "PersonFirstName": "tes",
            "dynamicList": {
              "value": {
                 "code": "List1",
                 "label": " List 1"
                },
                "list_items": [{
                     "code": "List1",
                     "label": " List 1"
                     },
                    {
                         "code": "List2",
                         "label": " List 2"
                        },
                    {
                        "code": "List3",
                       "label": " List 3"
                    },
                     {
                        "code": "List4",
                        "label": " List 4"
                    }
              ]
            }
              }
            };
    res.set('Content-Type', 'application/json')
    res.send(mockedResponse);

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
console.log(ccdHeader);
    res.send(ccdHeader);
});

app.get('/test3', (req, res, next) => {
    console.log(ccdBody);
    res.send(ccdBody);
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

