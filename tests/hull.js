/* global describe, it */
import { expect } from "chai";

import * as hull from "../src/hull";

describe("hull", () => {
  it("should be a set of loosly coupled utilities", () => {
    expect(hull).to.be.an("object");
  });
});
