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

    mockedResponse =

    {"case_details":{
        "id":1568299438832693,
        "jurisdiction":"DIVORCE",
        "state":"SOTAgreementPayAndSubmitRequired",
        "version":0,"case_type_id":"DIVORCE",
        "created_date":[2019,9,12,14,43,58,800000000],
        "last_modified":[2019,9,12,14,43,59,161000000],
        "security_classification":"PUBLIC",
        "case_data":{
            "PetitionerSolicitorEmail":"borislav.petrov@hmcts.net",
            "D8DivorceUnit":"eastMidlands",
            "D8DerivedRespondentHomeAddress":null,
            "D8SeparationTimeTogetherPermitted":"6 months",
            "D8DerivedRespondentCorrespondenceAddr":"22 wilberforce road\nadffadfdfas",
            "D8MarriagePetitionerName":"Juileta July",
                "dynamicList": {
                "OrgListOfUsers": {
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
            },
            "D8DerivedPetitionerHomeAddress":"22 wilberforce road\nadffadfdfas",
            "PetitionerSolicitorPhone":"07564333333","D8DivorceCostsClaim":"No","D8MarriageIsSameSexCouple":"No","D8FinancialOrder":"No","D8RespondentNameAsOnMarriageCertificate":"No","D8MarriageDate":"2000-01-01","D8InferredRespondentGender":"male","D8DivorceWho":"husband","D8RespondentCorrespondenceSendToSol":"No","D8RespondentFirstName":"Romeo","D8DocumentsUploaded":[],"D8MentalSeparationDate":"2005-01-01","D8PhysicalSeparationDate":"2005-01-01","D8DesertionTimeTogetherPermitted":null,"D8RespondentLastName":"Romi","D8PetitionerNameDifferentToMarriageCert":"No","D8JurisdictionConnection":["G"],"DerivedPetitionerSolicitorAddr":"22 wilberforce road \n adffadfdfas \n London \n London","PetitionerSolicitorName":"Boris Peterson","D8SelectedDivorceCentreSiteId":"AA01","D8MarriedInUk":"Yes","D8PetitionerLastName":"Juliet","D8PetitionerFirstName":"Julia","D8MarriageRespondentName":"Romeo Romi","D8SolicitorReference":"123456","D8PetitionerPhoneNumber":null,"D8ReasonForDivorceSeperationDate":"2005-01-01","D8PetitionerContactDetailsConfidential":"share","D8DocumentsGenerated":[{"id":"d831d14c-58c9-48c2-979c-3a0645e2cb3d","value":{"DocumentLink":{"document_url":"http://dm-store-demo.service.core-compute-demo.internal/documents/9f7ed0cf-0ac8-4324-8a0b-cac88fed42ea","document_filename":"draft-mini-petition-1568299438832693.pdf","document_binary_url":"http://dm-store-demo.service.core-compute-demo.internal/documents/9f7ed0cf-0ac8-4324-8a0b-cac88fed42ea/binary"},"DocumentType":"petition","DocumentComment":null,"DocumentFileName":"draft-mini-petition-1568299438832693","DocumentDateAdded":null,"DocumentEmailContent":null}}],"D8LegalProceedings":"No","PetitionerSolicitorFirm":"Boris Test Company","SepYears":"2","createdDate":"2019-09-12","D8ReasonForDivorce":"separation-2-years","D8SeparationReferenceDate":"12 March 2017","SolicitorAgreeToReceiveEmails":"Yes","D8PetitionerEmail":"","D8InferredPetitionerGender":"female","D8LivedApartSinceSeparation":"Yes"},"data_classification":{"PetitionerSolicitorEmail":"PUBLIC","D8DivorceUnit":"PUBLIC","D8DerivedRespondentHomeAddress":"PUBLIC","D8SeparationTimeTogetherPermitted":"PUBLIC","D8DerivedRespondentCorrespondenceAddr":"PUBLIC","D8MarriagePetitionerName":"PUBLIC","D8DerivedPetitionerHomeAddress":"PUBLIC","PetitionerSolicitorPhone":"PUBLIC","D8DivorceCostsClaim":"PUBLIC","D8MarriageIsSameSexCouple":"PUBLIC","D8FinancialOrder":"PUBLIC","D8RespondentNameAsOnMarriageCertificate":"PUBLIC","D8MarriageDate":"PUBLIC","D8InferredRespondentGender":"PUBLIC","D8DivorceWho":"PUBLIC","D8RespondentCorrespondenceSendToSol":"PUBLIC","D8RespondentFirstName":"PUBLIC","D8DocumentsUploaded":{"value":[],"classification":"PUBLIC"},"D8MentalSeparationDate":"PUBLIC","D8PhysicalSeparationDate":"PUBLIC","D8DesertionTimeTogetherPermitted":"PUBLIC","D8RespondentLastName":"PUBLIC","D8PetitionerNameDifferentToMarriageCert":"PUBLIC","D8JurisdictionConnection":"PUBLIC","DerivedPetitionerSolicitorAddr":"PUBLIC","PetitionerSolicitorName":"PUBLIC","D8SelectedDivorceCentreSiteId":"PUBLIC","D8MarriedInUk":"PUBLIC","D8PetitionerLastName":"PUBLIC","D8PetitionerFirstName":"PUBLIC","D8MarriageRespondentName":"PUBLIC","D8SolicitorReference":"PUBLIC","D8PetitionerPhoneNumber":"PUBLIC","D8ReasonForDivorceSeperationDate":"PUBLIC","D8PetitionerContactDetailsConfidential":"PUBLIC","D8DocumentsGenerated":{"value":[{"id":"d831d14c-58c9-48c2-979c-3a0645e2cb3d","value":{"DocumentLink":"PUBLIC","DocumentType":"PUBLIC","DocumentComment":"PUBLIC","DocumentFileName":"PUBLIC","DocumentDateAdded":"PUBLIC","DocumentEmailContent":"PUBLIC"}}],"classification":"PUBLIC"},"D8LegalProceedings":"PUBLIC","PetitionerSolicitorFirm":"PUBLIC","SepYears":"PUBLIC","createdDate":"PUBLIC","D8ReasonForDivorce":"PUBLIC","D8SeparationReferenceDate":"PUBLIC","SolicitorAgreeToReceiveEmails":"PUBLIC","D8PetitionerEmail":"PUBLIC","D8InferredPetitionerGender":"PUBLIC","D8LivedApartSinceSeparation":"PUBLIC"},"after_submit_callback_response":null,"callback_response_status_code":null,"callback_response_status":null,"delete_draft_response_status_code":null,"delete_draft_response_status":null,"security_classifications":{"PetitionerSolicitorEmail":"PUBLIC","D8DivorceUnit":"PUBLIC","D8DerivedRespondentHomeAddress":"PUBLIC","D8SeparationTimeTogetherPermitted":"PUBLIC","D8DerivedRespondentCorrespondenceAddr":"PUBLIC","D8MarriagePetitionerName":"PUBLIC","D8DerivedPetitionerHomeAddress":"PUBLIC","PetitionerSolicitorPhone":"PUBLIC","D8DivorceCostsClaim":"PUBLIC","D8MarriageIsSameSexCouple":"PUBLIC","D8FinancialOrder":"PUBLIC","D8RespondentNameAsOnMarriageCertificate":"PUBLIC","D8MarriageDate":"PUBLIC","D8InferredRespondentGender":"PUBLIC","D8DivorceWho":"PUBLIC","D8RespondentCorrespondenceSendToSol":"PUBLIC","D8RespondentFirstName":"PUBLIC","D8DocumentsUploaded":{"value":[],"classification":"PUBLIC"},"D8MentalSeparationDate":"PUBLIC","D8PhysicalSeparationDate":"PUBLIC","D8DesertionTimeTogetherPermitted":"PUBLIC","D8RespondentLastName":"PUBLIC","D8PetitionerNameDifferentToMarriageCert":"PUBLIC","D8JurisdictionConnection":"PUBLIC","DerivedPetitionerSolicitorAddr":"PUBLIC","PetitionerSolicitorName":"PUBLIC","D8SelectedDivorceCentreSiteId":"PUBLIC","D8MarriedInUk":"PUBLIC","D8PetitionerLastName":"PUBLIC","D8PetitionerFirstName":"PUBLIC","D8MarriageRespondentName":"PUBLIC","D8SolicitorReference":"PUBLIC","D8PetitionerPhoneNumber":"PUBLIC","D8ReasonForDivorceSeperationDate":"PUBLIC","D8PetitionerContactDetailsConfidential":"PUBLIC","D8DocumentsGenerated":{"value":[{"id":"d831d14c-58c9-48c2-979c-3a0645e2cb3d","value":{"DocumentLink":"PUBLIC","DocumentType":"PUBLIC","DocumentComment":"PUBLIC","DocumentFileName":"PUBLIC","DocumentDateAdded":"PUBLIC","DocumentEmailContent":"PUBLIC"}}],"classification":"PUBLIC"},"D8LegalProceedings":"PUBLIC","PetitionerSolicitorFirm":"PUBLIC","SepYears":"PUBLIC","createdDate":"PUBLIC","D8ReasonForDivorce":"PUBLIC","D8SeparationReferenceDate":"PUBLIC","SolicitorAgreeToReceiveEmails":"PUBLIC","D8PetitionerEmail":"PUBLIC","D8InferredPetitionerGender":"PUBLIC","D8LivedApartSinceSeparation":"PUBLIC"}},"case_details_before":null,"event_id":"shareACase","ignore_warning":false
    }

            ;
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

app.get('/test4', (req, res, next) => {
   postS2SLease();
    console.log('BORIS TOKEN: ', serviceToken);
    res.send(serviceToken);
});

app.get('/test5', (req, res, next) => {
    postS2SLease();
    res.send(serviceTokenError);
});

