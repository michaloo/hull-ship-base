import Hull from "hull";

import WebApp from "hull-ship-base/lib/app/web";
import InstrumentationAgent from "./src/instrumentation/instrumentation-agent";
import QueueAdapter from "hull-ship-base/lib/queue/adapter/kue";

const instrumentationAgent = new InstrumentationAgent();

const webApp = new WebApp({
  Hull,
  instrumentationAgent
});

const middlewares = [
  tokenMiddleware,
  hullMiddleware,
  RequireConfiguration(req => req),
  QueueMiddleware(queueAdapter),
  segmentsMiddleware
  bodyParser.json()
];

app.post("/batch", ..middlewares, (req, res, next) {
  return handleExtract(req, 100, (users) => {
    const segmentId = req.query.segment_id || null;
    users = users.map(setUserSegments.bind(null, req, { add_segment_ids: [segmentId] }));
  }).then(next, next);
}, responseMiddleware);

app.listen(port);
