/* global describe, it */
import { expect } from "chai";

import { setUserSegments } from "../src/hull";

describe("setUserSegments", () => {
  it("should remove user from all segments if not matching filter", () => {
    const segmentInfo = {
      add_segment_ids: [],
      remove_segment_ids: [],
      filter_segment_ids: ["b"],
      segment_ids: ["a", "b", "c"]
    };

    const user = setUserSegments({ segment_ids: ["a"] }, segmentInfo);

    expect(user.remove_segment_ids).to.be.eql(segmentInfo.segment_ids);
  });

  it("should not alter user if he matches the filter", () => {
    const segmentInfo = {
      add_segment_ids: [],
      remove_segment_ids: [],
      filter_segment_ids: ["b"],
      segment_ids: ["a", "b", "c"]
    };

    const user = setUserSegments({ segment_ids: ["b"] }, segmentInfo);

    expect(user.segment_ids).to.be.eql(["b"]);
    expect(user.remove_segment_ids).to.be.eql([]);
  });
});
