/**
 * @param  {Object} req
 * @return {Object}
 */
export default function getSettings(req) {
  return _.get(req.hull.ship, "private_settings", {});
}
