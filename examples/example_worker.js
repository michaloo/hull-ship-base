import Hull from "hull";

import InstrumentationAgent from "hull-ship-base/lib/instrumentation-agent";
import WorkerApp from "hull-ship-base/lib/app/worker";
import QueueAdapter from "hull-ship-base/lib/queue/adapter/kue";


const instrumentationAgent = new InstrumentationAgent();
const queueAdapter = new QueueAdapter({

});

const jobs = {
  sendUsers: (req) => {

  },
  saveUsers: (req) => {

  },
};

const WorkerApp = new WorkerApp({
  Hull, instrumentationAgent, queueAdapter, jobs
})
