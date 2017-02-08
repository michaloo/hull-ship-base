import { Router } from "express";
import bodyParser from "body-parser";

import responseMiddleware from "../helpers/response-middleware";

export default function QueueRouter({ queueAdapter }) {
  const router = Router();
  router.use(bodyParser.json());
  router.use(queueAdapter.middleware);

  router.job = function setJob(jobName) {
    router.all("/", (req, res, next) => {
      return req.hull.queue(jobName, {})
        .then(id => `queued:${id}`)
        .then(next, next);
    });
    router.use(responseMiddleware);
    return router;
  };

  return router;
}
