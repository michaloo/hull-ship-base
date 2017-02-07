import _ from "lodash";

/**
 * Returns information if the users should be sent in outgoing sync.
 * @param {Object} req Request Object
 * @param  {Object} user Hull user object
 * @return {Boolean}
 */
export default function filterUserSegments(req, user) {
  const filterSegmentIds = req.hull.ship.private_settings.synchronized_segments || [];
  if (filterSegmentIds.length === 0) {
    return true;
  }
  return _.intersection(filterSegmentIds, user.segment_ids).length > 0;
}
