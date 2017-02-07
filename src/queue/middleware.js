import queueCreate from "./create";

/**
 * req.hull.queue("jobName", { jobPayload });
 */
export default function queueMiddlewareFactory(queueAdapter) {
  return function queueMiddleware(req, res, next) {
    req.hull = req.hull || {};
    req.hull.queue = req.hull.queue || queueCreate.bind(null, queueAdapter, req);
    return next();
  }
}

