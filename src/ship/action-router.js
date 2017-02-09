import { Router } from "express";
import bodyParser from "body-parser";

import responseMiddleware from "./response-middleware";
import tokenMiddleware from "./token-middleware";

export default function ActionRouter({ hullMiddleware }) {
  const router = Router();
  router.use(bodyParser.json());
  router.use(tokenMiddleware);
  router.use(hullMiddleware);

  router.callback = function setAction(callback) {
    router.post("/", callback);
    router.use(responseMiddleware);
    return router;
  };

  return router;
}
