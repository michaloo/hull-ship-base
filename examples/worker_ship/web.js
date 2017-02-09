/* application */
import WebApp from "../../src/app/web";

/* utilities */
import { queueRouter, batchRouter } from "../../src/ship";
import queueUiRouter from "../../src/queue/ui-router";

/* common setup */
import * as common from "./common";

const app = new WebApp(common);

app.use("/batch", batchRouter({ ...common, chunkSize: 1 })
  .use(common.queueAgent.middleware)
  .callback((req, users) => req.hull.queue("sendUsers", { users }))
);

app.use("/queue", queueRouter(common).job("monitorQueue"));

app.use("/kue", queueUiRouter(common));


app.listenHull(8070);
