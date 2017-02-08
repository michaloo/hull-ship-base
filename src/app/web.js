import express from "express";
import { renderFile } from "ejs";
import timeout from "connect-timeout";

import StaticRouter from "../helpers/static-router";


/**
 * Base Express app for Ships front part
 */
export default function WebApp({ Hull, instrumentationAgent }) {
  const app = express();

  app.use(instrumentationAgent.startMiddleware());
  app.use(instrumentationAgent.metricMiddleware);

  // the main responsibility of following timeout middleware
  // is to make the web app respond always in time
  app.use(timeout("25s"));
  app.engine("html", renderFile);

  app.set("views", `${process.cwd()}/assets`);
  app.set("view engine", "ejs");

  app.use("/", StaticRouter({ Hull }));

  // const originalListen = app.listen;
  app.listenHull = function listenHull(port, cb) {
    // app.use(instrumentationAgent.stopMiddleware());
    return app.listen(port, () => {
      Hull.logger.info("webApp.listen", port);
      if (cb) {
        cb();
      }
    });
  };

  return app;
}
