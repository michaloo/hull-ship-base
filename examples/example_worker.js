import Hull from "hull";

import InstrumentationAgent from "../src/instrumentation/instrumentation-agent";
import WorkerApp from "../src/app/worker";
import QueueAdapter from "../src/queue/adapter/kue";


const instrumentationAgent = new InstrumentationAgent();
const queueAdapter = new QueueAdapter({});

const jobs = {
  sendUsers: (req) => {

  },
  saveUsers: (req) => {

  },
};

const workerApp = new WorkerApp({
  Hull, instrumentationAgent, queueAdapter, jobs
})

workerApp.process();
