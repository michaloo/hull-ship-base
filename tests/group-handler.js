/* global describe, it */
import Promise from "bluebird";
import { expect } from "chai";

import GroupHandler from "../src/ship/group-handler";

const reqStub = {
  hull: {
    ship: {
      id: "test"
    },
    client: {
      logger: {
        info: () => {}
      }
    }
  }
};

describe("GroupHandler", () => {
  it("should group incoming messages", (done) => {
    GroupHandler
    .getHandler("test", { req: reqStub })
    .setCallback((messages) => {
      expect(messages).to.be.eql(["test"]);
      done();
      return Promise.resolve();
    })
    .addMessage("test");
  });
});
