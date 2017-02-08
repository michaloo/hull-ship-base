import Hull from "hull";

import WebApp from "../src/app/web";
import InstrumentationAgent from "../src/instrumentation/instrumentation-agent";
import QueueAdapter from "../src/queue/adapter/kue";

const instrumentationAgent = new InstrumentationAgent();

const app = new WebApp({
  Hull,
  instrumentationAgent
});

const middlewares = [
  // tokenMiddleware,
  Hull.Middleware({}),
  // RequireConfiguration(req => req),
  // QueueMiddleware(queueAdapter),
  // segmentsMiddleware,
  // bodyParser.json()
];

app.post("/batch", ...middlewares, (req, res, next) => {
  return handleExtract(req, 100, (users) => {
    const segmentId = req.query.segment_id || null;
    users = users.map(setUserSegments.bind(null, req, { add_segment_ids: [segmentId] }));
  }).then(next, next);
}/*, responseMiddleware*/);

app.listen(8070);
