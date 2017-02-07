/* global describe, it */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import filterUserSegments from "../src/hull/filter-user-segments";

describe("filterUserSegments", () => {
  it("should pass all users when filteredSegmentIds is empty", () => {
    expect(filterUserSegments({ segment_ids: [] }, []))
      .to.be.true;

    expect(filterUserSegments({ segment_ids: ["a", "b"] }, []))
      .to.be.true;
  });

  it("should not pass user not matching the filterSegmentIds", () => {
    expect(filterUserSegments({ segment_ids: [] }, ["a"]))
      .to.be.false;

    expect(filterUserSegments({ segment_ids: ["b"] }, ["a"]))
      .to.be.false;

    expect(filterUserSegments({ segment_ids: ["c", "d"] }, ["a", "b"]))
      .to.be.false;
  });

  it("should pass user matching the filterSegmentIds", () => {
    expect(filterUserSegments({ segment_ids: ["a"] }, ["a"]))
      .to.be.true;

    expect(filterUserSegments({ segment_ids: ["b"] }, ["a", "b"]))
      .to.be.true;

    expect(filterUserSegments({ segment_ids: ["c", "d"] }, ["a", "b", "c"]))
      .to.be.true;
  });
});
