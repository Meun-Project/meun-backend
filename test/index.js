import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index.js";

const { expect } = chai;
chai.use(chaiHttp);

describe("Get Users API", () => {
  it("should return all users", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("should return an error if something went wrong", (done) => {
    chai
      .request(app)
      .get("/users")
      .end((err, res) => {
        expect(res).to.have.status(500);
        expect(res.body).to.have.property("message");
        done();
      });
  });
});
