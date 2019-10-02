const express = require('express');
const axios = require('axios');
const app = express();
const otp = require('otp');
app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is running');
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// s2s token generation
const s2sSecretunTrimmed = process.env.S2S_SECRET;
const s2sSecret = s2sSecretunTrimmed.trim();
let tokenresponse;
let tokenerror;
let serviceToken;

let serviceTokenError;

function postS2SLease() {
    let response;
    const oneTimePassword = otp({secret: s2sSecret}).totp();

    response = axios.post('http://rpe-service-auth-provider-demo.service.core-compute-demo.internal/lease', {
        microservice: 'xui_webapp',
        oneTimePassword: oneTimePassword
    })
        .then(function (response) {
            serviceToken = response.data;
            console.log(serviceToken);
        })
        .catch(function (error) {
            serviceTokenError = error;
        });
    return serviceToken;
}

var ccdHeader;
var authorizationToken;
var s2sTokenCCD;
var ccdBody;
var ccdResponsePost1;
var  rawresponseRD;
var listItemsArrayToSend;
var responseToSendOnFirstPost;
var responseFromPRD;
var responseFromPRDError;

app.post('/test1', (req, res, next) => {
    console.log(req);
    console.log('REQUEST BODY: ', req.body);
    ccdHeader = req.headers;
    ccdBody = req.body;
    authorizationToken = req.headers.authorization;
    s2sTokenCCD = req.headers.serviceauthorization;


    axios({
        method: 'get',
        url: 'http://rd-professional-api-demo.service.core-compute-demo.internal/refdata/external/v1/organisations/users',
        headers: {'ServiceAuthorization': serviceToken, 'Authorization': authorizationToken },
    })
        .then(function(response) {
          responseFromPRD = response;
          rawresponseRD = response.data.users;

            var idamStatus = "idamStatus";
            // search for ACTIVE only
            function searchActive(nameKey, myArray){
              var  myUpdatedArray = [];
                for (var i=0; i < myArray.length; i++) {
                    if (myArray[i].idamStatus === nameKey) {
                        myUpdatedArray.push(myArray[i]);
                    }
                }
                return myUpdatedArray;
            }

            ccdResponsePost1 =  searchActive("ACTIVE", rawresponseRD);

            // create an array with desired values
            function createListItemsArray(myArray){
                var  listItemsArray = [];
                var userIdentifier = "userIdentifier";
                var firstName = "firstName";
                for (var i=0; i < myArray.length; i++) {

                        listItemsArray.push(   {
                            "code": myArray[i].userIdentifier,
                            "label": myArray[i].firstName
                        }    );

                }
                return listItemsArray;
            }




            listItemsArrayToSend = createListItemsArray(ccdResponsePost1);


            responseToSendOnFirstPost = {

                "data": {
                    "OrgListOfUsers": {
                        "value": listItemsArrayToSend[0],
                        "list_items": listItemsArrayToSend
                    }
                }

            };


            res.set('Content-Type', 'application/json');
            res.send(responseToSendOnFirstPost);
        }) .catch(function (error) {
        responseFromPRDError = error;
    });




/*
    ccdResponsePost1 = {

            "data": {
                "OrgListOfUsers": {
                    "value": {
                        "code": "FixedList1",
                        "label": "Fixed List 1"
                    },
                    "list_items": [{
                        "code": "FixedList1",
                        "label": "Fixed List 1"
                    }, {
                        "code": "FixedList2",
                        "label": "Fixed List 2"
                    }, {
                        "code": "FixedList3",
                        "label": "Fixed List 3"
                    }, {
                        "code": "FixedList4",
                        "label": "Fixed List 4"
                    }, {
                        "code": "FixedList5",
                        "label": "Fixed List 5"
                    }, {
                        "code": "FixedList6",
                        "label": "Fixed List 6"
                    }, {
                        "code": "FixedList7",
                        "label": "Fixed List 7"
                    }
                    ]
                }
            }

    };

*/

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



app.get('/test4', (req, res, next) => {
    postS2SLease();
    console.log('BORIS TOKEN: ', serviceToken);
    res.send(serviceToken);
});

app.get('/test5', (req, res, next) => {
    postS2SLease();
    res.send(serviceTokenError);
});

let mockedResponse1;
let selectedColeagueResponse;
app.post('/test6', (req, res, next) => {
    console.log(req);
    console.log('REQUEST BODY: ', req.body);
    selectedColeagueResponse = req.body;

    mockedResponse1 = {

    };
    res.set('Content-Type', 'application/json')
    res.send(mockedResponse1);
});

app.get('/test7', (req, res, next) => {
    res.send(selectedColeagueResponse);
});

app.get('/test8', (req, res, next) => {
    res.send(responseFromPRD);
});

app.get('/test9', (req, res, next) => {
    res.send(responseFromPRDError);
});

app.get('/test10', (req, res, next) => {
    res.send(serviceToken);
});

app.get('/test11', (req, res, next) => {
    res.send(authorizationToken);
});
