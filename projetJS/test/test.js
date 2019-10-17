const supertest = require("supertest");
const should = require("should");
const moment = require("moment");
const app = require('../app');
let server = supertest.agent(app);
const crypto = require("crypto");

var user = crypto.randomBytes(10).toString('hex');
var passwd = crypto.randomBytes(10).toString('hex');
var userid = "";
let idcal = "";
let token = "";

describe("API test",function(){
    it("should return home page",function(done){
        server
            .get("/")
            .expect("Content-type",/json/)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return 404",function(done) {
        server
            .get("/random")
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });

    it("should create a new user",function(done) {
        server
            .post("/api/auth/signup")
            .send({username : user, password : passwd})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(201);
                done();
            });
    });

    it("should login as the newly created user",function(done) {
        server
            .post("/api/auth/login")
            .send({username : user, password : passwd})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                token = res.body.accessToken;
                done();
            });
    });

    it("should return 'no token provided' after an unauthenticated request",function(done) {
        server
            .get("/api/user")
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(403);
                console.log(res.body);
                done();
            });
    });

    it("should successfully make an authenticated get request as the new user",function(done) {
        server
            .get("/api/user")
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                console.log(res.body);
                done();
            });
    });


    it("should successfully make an authenticated get request with arguments as the new user",function(done) {
        server
            .get("/api/user/name")
            .set('token',token)
            .send({username : user})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                userid = res.body.id;
                done();
            });
    });


    it("should create a calendar and an event for the new user",function(done) {
        server
            .post("/api/calendar")
            .set('token',token)
            .send({user_id : userid, calendar_name : 'calendar_test'})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(201);
                idcal = res.body.id;
                done();
            });
    });

    it("should create a calendar and an event for the new user",function(done) {
        server
            .post("/api/event")
            .set('token',token)
            .send({calendar_id : idcal, event_name: 'test_event', event_beginning: moment(), event_end: moment().add(2, 'hours'), event_type: 'test'})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                console.log(res.body);

                res.status.should.equal(201);
                done();
            });
    });

    it("should delete the new user",function(done) {
        server
            .delete("/api/user/")
            .set('token',token)
            .send({username : user})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(204);
                console.log(res.body);
                done();
            });
    });

});