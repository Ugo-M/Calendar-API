const supertest = require("supertest");
const should = require("should");
const moment = require("moment");
const app = require('../app');
let server = supertest.agent(app);
const crypto = require("crypto");

let user = crypto.randomBytes(10).toString('hex');
let newuser = crypto.randomBytes(10).toString('hex');
let passwd = crypto.randomBytes(10).toString('hex');
let fakeid = 9999;
let userid = "";
let idcal = "";
let evntid = "";
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
            .post("/api/user/auth/signup")
            .send({username : user, password : passwd})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(201);
                done();
            });
    });


    it("should return 400 after after attempting to signup without a password or username",function(done) {
        server
            .post("/api/user/auth/signup")
            .send({username : newuser})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(400);
                done();
            });
    });


    it("should login as the newly created user",function(done) {
        server
            .post("/api/user/auth/login")
            .send({username : user, password : passwd})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                token = res.body.accessToken;
                done();
            });
    });


    it("should return 401 after attempting to login with the wrong password",function(done) {
        server
            .post("/api/user/auth/login")
            .send({username : user, password : "fakepass"})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(401);
                done();
            });
    });


    it("should return 404 after attempting to login as an unregistered user",function(done) {
        server
            .post("/api/user/auth/login")
            .send({username : newuser, password : passwd})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should return 403 after an unauthenticated request",function(done) {
        server
            .get("/api/user")
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(403);
                done();
            });
    });


    it("should make an authenticated get request as the new user",function(done) {
        server
            .get("/api/user")
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return the user's id from his name",function(done) {
        server
            .get("/api/user/name/"+user)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                userid = res.body.id;
                done();
            });
    });


    it("should return 404 after a getByName request on a nonexistent user",function(done) {
        server
            .get("/api/user/name/"+newuser)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should return the new user's id",function(done) {
        server
            .get("/api/user/id")
            .set('token',token)
            .send({username : user})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                userid = res.body.id;
                done();
            });
    });


    it("should return 404 after a getId request on a nonexistent user",function(done) {
        server
            .get("/api/user/id")
            .set('token',token)
            .send({username : newuser})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should return the new user from his id",function(done) {
        server
            .get("/api/user/id/"+userid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return 404 after a getById request on a nonexistent user",function(done) {
        server
            .get("/api/user/id/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should update the new user",function(done) {
        server
            .put("/api/user/"+userid)
            .set('token',token)
            .send({username : newuser})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return 404 after an update request on a nonexistent user",function(done) {
        server
            .put("/api/user/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should create a calendar for the new user",function(done) {
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

    it("should return all the calendars",function(done) {
        server
            .get("/api/calendar")
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return the new calendar from its id",function(done) {
        server
            .get("/api/calendar/"+idcal)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return 404 after a getById request on a nonexistent calendar",function(done) {
        server
            .get("/api/calendar/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should update the new calendar",function(done) {
        server
            .put("/api/calendar/"+idcal)
            .set('token',token)
            .send({calendar_name : "new_calendar_name"})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return 404 after an update request on a nonexistent calendar",function(done) {
        server
            .put("/api/calendar/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should add an event to the new user's calendar",function(done) {
        server
            .post("/api/event")
            .set('token',token)
            .send({calendar_id : idcal, event_name: 'test_event', event_beginning: moment(), event_end: moment().add(2, 'hours'), event_type: 'test'})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(201);
                evntid = res.body.id;
                done();
            });
    });

    it("should return all the events",function(done) {
        server
            .get("/api/event")
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return the new event from its id",function(done) {
        server
            .get("/api/event/"+evntid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return 404 after a getById request on a nonexistent event",function(done) {
        server
            .get("/api/event/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should update the new event",function(done) {
        server
            .put("/api/event/"+evntid)
            .set('token',token)
            .send({event_name : "new_event_name"})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(200);
                done();
            });
    });


    it("should return 404 after an update request on a nonexistent event",function(done) {
        server
            .put("/api/event/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should delete the new event",function(done) {
        server
            .delete("/api/event/"+evntid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(204);
                done();
            });
    });


    it("should return 404 after an delete request on a nonexistent event",function(done) {
        server
            .delete("/api/event/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });


    it("should delete the new calendar",function(done) {
        server
            .delete("/api/calendar/"+idcal)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(204);
                done();
            });
    });


    it("should return 404 after an delete request on a nonexistent calendar",function(done) {
        server
            .delete("/api/calendar/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                done();
            });
    });


    it("should delete the new user",function(done) {
        server
            .delete("/api/user/")
            .set('token',token)
            .send({username : newuser})
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(204);
                done();
            });
    });


    it("should return 404 after an delete request on a nonexistent user",function(done) {
        server
            .delete("/api/user/"+fakeid)
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .end(function (err, res) {
                res.status.should.equal(404);
                done();
            });
    });

});