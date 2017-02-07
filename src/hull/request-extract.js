import Promise from "bluebird";

/**
 * Start an extract job and be notified with the url when complete.
 * @param  {Object} req request object
 * @param  {Object} options
 * @return {Promise}
 */
export default function requestExtract(req, { segment = null, format = "json", path = "batch", fields = [] }) {
  const hullClient = req.hull.client;
  const { hostname } = req;
  const search = (req.query || {});
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
    return hullClient.get(segment.id);
  })()
  .then(({ query }) => {
    const params = { query, format, url, fields };
    hullClient.logger.info("requestExtract", params);
    return hullClient.post("extract/user_reports", params);
  });
}
