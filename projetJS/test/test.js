const supertest = require("supertest");
const should = require("should");
const app = require('../app');
let server = supertest.agent(app);
const crypto = require("crypto");

var user = crypto.randomBytes(10).toString('hex');
var passwd = crypto.randomBytes(10).toString('hex');

let token = "";

describe("API test",function(){
    it("should return home page",function(done){
        server
            .get("/")
            .expect("Content-type",/json/)
            .expect(200)
            .end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it("should return 404",function(done) {
        server
            .get("/random")
            .expect(404)
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
            .expect(201)
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
            .expect(200)
            .end(function (err, res) {
                token = res.body.accessToken;
                res.status.should.equal(200);
                done();
            });
    });

    it("should return 'no token provided' after an unauthenticated request",function(done) {
        server
            .get("/api/user")
            .expect("Content-type", /json/)
            .expect(403)
            .end(function (err, res) {
                console.log(res.body);
                res.status.should.equal(403);
                done();
            });
    });

    it("should successfully make an authenticated get request as the new user",function(done) {
        server
            .get("/api/user")
            .set('token',token)
            .send()
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                res.status.should.equal(200);
                done();
            });
    });


    it("should successfully make an authenticated get request with arguments as the new user",function(done) {
        server
            .get("/api/user/name")
            .set('token',token)
            .send({username : user})
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                res.status.should.equal(200);
                done();
            });
    });

    it("should delete the new user",function(done) {
        server
            .delete("/api/user/")
            .set('token',token)
            .send({username : user})
            .expect("Content-type", /json/)
            .expect(204)
            .end(function (err, res) {
                console.log(res.body);
                res.status.should.equal(204);
                done();
            });
    });

});