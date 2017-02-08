import Hull from "hull";

import InstrumentationAgent from "../../src/instrumentation";
import QueueAdapter from "../../src/queue/adapter/kue";

export Hull from "hull";
export const hostSecret = process.env.SECRET || "1234";
export const instrumentationAgent = new InstrumentationAgent();
export const queueAdapter = new QueueAdapter({ redis: process.env.REDIS_URL });
export const hullMiddleware = Hull.Middleware({ hostSecret });
