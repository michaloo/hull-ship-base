/**
 * This Middleware makes sure that we have the ship configured to make
 * 3rd API calls
 * @param  {Function} check
 */
export default function requireConfigurationFactory(check) {
  return requireConfigurationMiddleware(req, res, next) {
    if (!check(req)) {
      req.hull.client.logger.info("Ship is not configured");
      return res.status(403).send("Ship is not configured");
    }
    return next();
  }
}

