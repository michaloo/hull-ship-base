/* global describe, it */
import { expect } from "chai";
import mockSettings from "./support/mock-settings";

import agentMiddleware from "../src/hull/agent-middleware";

const reqStub = mockSettings({ synchronized_segments: [1, 3, 4] });

describe("agentMiddleware", () => {
  it("should register agent param", () => {
    agentMiddleware(reqStub, {}, () => {});
    expect(reqStub.hull.agent).to.be.an("object");
  });
  it("should bind all functions to Request Object", () => {
    agentMiddleware(reqStub, {}, () => {});
    expect(reqStub.hull.agent.getSettings().synchronized_segments).to.be.eql([1, 3, 4]);
  });
});
