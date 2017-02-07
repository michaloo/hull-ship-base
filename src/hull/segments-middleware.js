/**
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
