const supertest = require("supertest");
const should = require("should");

let server = supertest.agent("http://localhost:3000");

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

});