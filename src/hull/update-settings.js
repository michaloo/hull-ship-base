/**
   * Updates `private_settings`, touching only provided settings.
   * Also clears the `shipCache`.
   * `hullClient.put` will emit `ship:update` notify event.
   * @param  {Object} newSettings settings to update
   * @return {Promise}
   */
export default function updateSettings(req, newSettings) {
  const hullClient = req.hull.client;
  return hullClient.get(this.ship.id)
    .then(ship => {
      const private_settings = { ...ship.private_settings, ...newSettings };
      ship.private_settings = private_settings;
      return hullClient.put(ship.id, { private_settings });
    })
    .then((ship) => {
      req.hull.ship = ship;
      if (!req.shipApp.shipCache) {
        return ship;
      }
      return req.shipApp.shipCache.del(ship.id)
        .then(() => {
          return ship;
        });
    });
}
