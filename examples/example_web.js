const InstrumentationAgent from "hull-ship-base/lib/instrumentation-agent";
const WebApp from "hull-ship-base/lib/app/web";
const StaticRouter from "hull-ship-base/lib/router/static";

const webApp = new WebApp();

webApp.use(StaticRouter);

webApp.listen(port);

