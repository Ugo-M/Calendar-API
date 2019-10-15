const supertest = require("supertest");
const should = require("should");
const app = require('../app');
let server = supertest.agent(app);

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
                res.status.should.equal(200);
                done();
            });
    });

});