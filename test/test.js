const request = require('supertest');
const express = require('express');
const app = express();


app.get('/', function(req, res) {
    res.status(200).json({ name: 'john' });
});

describe('GET /', function(){
    it('respond with json', function(done){
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                done()
            });
    })
});
