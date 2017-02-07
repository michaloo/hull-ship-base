import _ from "lodash";
import * as hull from "./index";

/**
 * req.hull.queue("jobName", { jobPayload });
 */
export default function hullAgentMiddleware(req, res, next) {
  req.hull = req.hull || {};
  req.hull.agent = req.hull.agent || _.bindAll(hull, _.keys(hull));
  return next();
}

