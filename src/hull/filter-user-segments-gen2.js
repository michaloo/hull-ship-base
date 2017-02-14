import _ from "lodash";

/**
 * Returns information if the users should be sent in outgoing sync.
 * This version should filter out all users if the `synchronized_segments`
 * setting is empty
 * @param  {Object} req Request Object
 * @param  {Object} user Hull user object
 * @return {Boolean}
 */
export default function filterUserSegmentsGen2(req, user) {
  const filterSegmentIds = _.get(req, "hull.ship.private_settings.synchronized_segments", []);
  return _.intersection(filterSegmentIds, user.segment_ids).length > 0;
}
