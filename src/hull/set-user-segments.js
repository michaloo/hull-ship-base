import _ from "lodash";

import filterUserSegments from "./filter-user-segments";

/**
 * When the user is within the
 * @param {Object} req Request Object
 * @param {Object} segment_information
 *        add_segment_ids    list of segment_ids to add the each user
 *        remove_segment_ids list of segment_ids to be removed from each user
 *        filter_segment_ids list of segment_ids to filter users
 *        segment_ids        list of all segment_ids
 * @param {Object} user Hull user
 * @type {Array}
 */
export default function setUserSegments(req, { add_segment_ids = [], remove_segment_ids = [] }, user) {
  const segmentIds = _.get(req, "hull.segments", []).map(s => s.id) || [];
  user.segment_ids = _.uniq(_.concat(user.segment_ids || [], _.filter(add_segment_ids)));
  if (filterUserSegments(req, user)) {
    user.remove_segment_ids = _.filter(remove_segment_ids);
  } else {
    user.segment_ids = [];
    user.remove_segment_ids = segmentIds;
  }
  return user;
}
