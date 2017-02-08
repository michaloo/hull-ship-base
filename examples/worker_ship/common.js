import Hull from "hull";

import InstrumentationAgent from "../../src/instrumentation";
import QueueAgent from "../../src/queue";

export Hull from "hull";
export const hostSecret = process.env.SECRET || "1234";
export const instrumentationAgent = new InstrumentationAgent();
export const queueAgent = new QueueAgent("kue", { redis: process.env.REDIS_URL });
export const hullMiddleware = Hull.Middleware({ hostSecret });
