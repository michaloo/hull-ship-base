/* application */
import WorkerApp from "../../src/app/worker";

/* common setup */
import * as common from "./common";

const jobs = {
  sendUsers: (req) => {
    console.log("sendUsers", req.payload.users.length);
  }
};

const workerApp = new WorkerApp({ ...common, jobs });

workerApp.process();
