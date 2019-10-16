const supertest = require("supertest");
const should = require("should");
const app = require('../app');
let server = supertest.agent(app);
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

    it("should login as user test",function(done) {
        server
            .post("/api/auth/login")
            .send({username : "test", password : "testpass"})
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

    it("should successfully make a get request as authenticated user test",function(done) {
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

});