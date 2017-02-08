import { Router } from "express";
import bodyParser from "body-parser";

import { handleExtract, setUserSegments, filterUserSegments } from "../hull";
import responseMiddleware from "./response-middleware";
import tokenMiddleware from "./token-middleware";

export default function BatchRouter({ hullMiddleware, chunkSize = 100 }) {
  const router = Router();
  router.use(bodyParser.json());
  router.use(tokenMiddleware);
  router.use(hullMiddleware);

  router.callback = function setCallback(callback) {
    router.post("/", (req, res, next) => {
      return handleExtract(req, chunkSize, (users) => {
        const segmentId = req.query.segment_id || null;
        users = users.map(u => setUserSegments(req, { add_segment_ids: [segmentId] }, u));
        users = users.filter(u => filterUserSegments(req, u));
        return callback(req, users);
      }).then(next, next);
    });
    router.use(responseMiddleware);
    return router;
  };

  return router;
}
