/* application */
import WebApp from "../../src/app/web";

/* utilities */
import { QueueRouter, BatchRouter } from "../../src/util";
import QueueUiRouter from "../../src/queue/ui-router";

/* common setup */
import * as common from "./common";

const app = new WebApp(common);

app.use("/batch", BatchRouter({ ...common, chunkSize: 1 })
  .use(common.queueAdapter.middleware)
  .callback((req, users) => req.hull.queue("sendUsers", { users }))
);

app.use("/queue", QueueRouter(common).job("monitorQueue"));

app.use("/kue", QueueUiRouter(common));


app.listenHull(8070);
