import _ from "lodash";

import filterUserSegments from "./filter-user-segments";

/**
 * When the user is within the
 * @param {Object} user
 * @param {Object} segment_information
 *        add_segment_ids    list of segment_ids to add the each user
 *        remove_segment_ids list of segment_ids to be removed from each user
 *        filter_segment_ids list of segment_ids to filter users
 *        segment_ids        list of all segment_ids
 * @type {Array}
 */
export default function setUserSegments(user, {
  add_segment_ids = [], remove_segment_ids = [], filter_segment_ids = [], segment_ids = []
}) {
  user.segment_ids = _.uniq(_.concat(user.segment_ids || [], _.filter(add_segment_ids)));
  if (filterUserSegments(user, filter_segment_ids)) {
    user.remove_segment_ids = _.filter(remove_segment_ids);
  } else {
    user.segment_ids = [];
    user.remove_segment_ids = segment_ids;
  }
  return user;
}
