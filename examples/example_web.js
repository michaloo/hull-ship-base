const InstrumentationAgent from "hull-ship-base/lib/instrumentation-agent";
const WebApp from "hull-ship-base/lib/app/web";
const StaticRouter from "hull-ship-base/lib/router/static";

const webApp = new WebApp();

const middlewares = [
  tokenMiddleware,
  hullMiddleware,
  requireConfiguration,
  bodyParser.json()
];

app.post("/batch", ..middlewares, (req, res, next) {
  return handleExtract(req, 100, (users) => {
    const segmentId = req.query.segment_id || null;
    users = users.map(setUserSegments.bind(null, req, { add_segment_ids: [segmentId] }));
  }).then(next, next);
}, responseMiddleware);

webApp.listen(port);

