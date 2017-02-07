import _ from "lodash";
import URI from "urijs";
import Promise from "bluebird";

import getProperties from "./get-properties";

export default class HullAgent {

  constructor(req, shipCache = null) {
    this.hullClient = req.hull.client;
    this.ship = req.hull.ship;
    this.shipCache = shipCache;
  }

  /**
   * Updates `private_settings`, touching only provided settings.
   * Also clears the `shipCache`.
   * `hullClient.put` will emit `ship:update` notify event.
   * @param  {Object} newSettings settings to update
   * @return {Promise}
   */
  updateShipSettings(newSettings) {
    return this.hullClient.get(this.ship.id)
      .then(ship => {
        this.ship = ship;
        const private_settings = { ...this.ship.private_settings, ...newSettings };
        this.ship.private_settings = private_settings;
        return this.hullClient.put(this.ship.id, { private_settings });
      })
      .then((ship) => {
        if (!this.shipCache) {
          return ship;
        }
        return this.shipCache.del(this.ship.id)
          .then(() => {
            return ship;
          });
      });
  }

  getShipSettings() {
    return _.get(this.ship, "private_settings", {});
  }

  /**
   * gets all existing Properties in the organization along with their metadata
   * @return {Promise}
   */
  getAvailableProperties() {
    return this.hullClient
      .get("search/user_reports/bootstrap")
      .then(({ tree }) => getProperties(tree).properties);
  }

  /**
   * @param  {Object} user
   * @return {Boolean}
   */
  userComplete(user) {
    return !_.isEmpty(user.email);
  }

  /**
   * Returns information if the users should be sent in outgoing sync.
   * @param  {Object} user Hull user object
   * @return {Boolean}
   */
  userWhitelisted(user) {
    const segmentIds = _.get(this.ship, "private_settings.synchronized_segments", []);
    if (segmentIds.length === 0) {
      return true;
    }
    return _.intersection(segmentIds, user.segment_ids).length > 0;
  }

  getSegments() {
    return this.hullClient.get("/segments");
  }

  /**
   * Start an extract job and be notified with the url when complete.
   * @param  {Object} segment - A segment
   * @param  {String} format - csv or json
   * @return {Promise}
   */
  request({ segment = null, format = "json", path = "batch", fields = [] }) {
    const { hostname } = this.req;
    const search = (this.req.query || {});
    if (segment) {
      search.segment_id = segment.id;
    }
    const url = URI(`https://${hostname}`)
      .path(path)
      .search(search)
      .toString();

    return (() => {
      if (segment == null) {
        return Promise.resolve({
          query: {}
        });
      }

      if (segment.query) {
        return Promise.resolve(segment);
      }
      return this.hullClient.get(segment.id);
    })()
    .then(({ query }) => {
      const params = { query, format, url, fields };
      this.hullClient.logger.info("extractAgent.requestExtract", params);
      return this.hullClient.post("extract/user_reports", params);
    });
  }
}
