/* global describe, it */
/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import filterUserSegments from "../src/hull/filter-user-segments";

import mockSettings from "./support/mock-settings";

function mockReq(segments) {
  return mockSettings({ synchronized_segments: segments });
}

describe("filterUserSegments", () => {
  it("should pass all users when filteredSegmentIds is empty", () => {
    expect(filterUserSegments(mockReq([]), { segment_ids: [] }))
      .to.be.true;

    expect(filterUserSegments(mockReq([]), { segment_ids: ["a", "b"] }))
      .to.be.true;
  });

  it("should not pass user not matching the filterSegmentIds", () => {
    expect(filterUserSegments(mockReq(["a"]), { segment_ids: [] }))
      .to.be.false;

    expect(filterUserSegments(mockReq(["a"]), { segment_ids: ["b"] }))
      .to.be.false;

    expect(filterUserSegments(mockReq(["a", "b"]), { segment_ids: ["c", "d"] }))
      .to.be.false;
  });

  it("should pass user matching the filterSegmentIds", () => {
    expect(filterUserSegments(mockReq(["a"]), { segment_ids: ["a"] }))
      .to.be.true;

    expect(filterUserSegments(mockReq(["a", "b"]), { segment_ids: ["b"] }))
      .to.be.true;

    expect(filterUserSegments(mockReq(["a", "b", "c"]), { segment_ids: ["c", "d"] }))
      .to.be.true;
  });
});
