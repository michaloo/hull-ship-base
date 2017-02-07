/**
 * This Middleware makes sure that we have the ship configured to make
 * 3rd API calls
 * @param  {Object}   req
 * @param  {Object}   res
 * @param  {Function} next
 */
export default function segmentsMiddleware(req, res, next) {
  if (!req.hull.client) {
    return next();
  }

  req.hull.client.get("/segments")
    .then(segments => {
      req.hull.segments = segments;
      next();
    });
}
