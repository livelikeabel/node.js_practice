var superagent = require("superagent");
var expect = require("expect.js");

describe("express rest api server", function() {
  var id;
  it("post object", function(done) {
    superagent
      .post("http://localhost:3000/collections/test")
      .send({
        name: "John",
        email: "john@rpjs.co"
      })
      .end(function(e, res) {
        expect(e).to.eql(null);
        expect(res.body.length).to.eql(1);
        expect(res.body[0]._id.length).to.eql(24);
        id = res.body[0]._id;
        done();
      });
  });
});
