import Supply from "supply";
import Promise from "bluebird";
import _ from "lodash";

/**
 * Background worker using QueueAdapter.
 */
export default class WorkerApp {
  constructor({ queueAdapter, instrumentationAgent, jobs }) {
    this.queueAdapter = queueAdapter;
    this.jobs = jobs;
    this.instrumentationAgent = instrumentationAgent;

    this.supply = new Supply();

    this.use(instrumentationAgent.metricMiddlware);

    // instrument jobs between 1 and 5 minutes
    setInterval(this.metricJobs.bind(this), _.random(60000, 300000));
  }

  metricJobs() {
    return Promise.all([
      this.queueAdapter.inactiveCount(),
      this.queueAdapter.failedCount()
    ]).spread((inactiveCount, failedCount) => {
      this.instrumentationAgent.metricVal("ship.queue.waiting", inactiveCount);
      this.instrumentationAgent.metricVal("ship.queue.failed", failedCount);
    });
  }

  use(middleware) {
    this.supply.use(middleware);
    return this;
  }

  process() {
    // FIXME: move queue name to dependencies
    this.queueAdapter.process("queueApp", (job) => {
      return this.dispatch(job);
    });

    return this;
  }

  dispatch(job) {
    const jobName = job.data.name;
    const req = job.data.context;
    const jobData = job.data.payload;
    req.payload = jobData || {};
    const res = {};

    const startTime = process.hrtime();
    return Promise.fromCallback((callback) => {
      this.instrumentationAgent.startTransaction(jobName, () => {
        this.runMiddleware(req, res)
          .then(() => {
            if (!this.jobs[jobName]) {
              const err = new Error(`Job not found: ${jobName}`);
              req.hull.client.logger.error(err.message);
              return Promise.reject(err);
            }
            req.hull.client.logger.info("dispatch", { id: job.id, name: jobName });
            req.metric.inc(`ship.job.${jobName}.start`);
            return this.jobs[jobName].call(job, req, res);
          })
          .then((jobRes) => {
            callback(null, jobRes);
          }, (err) => {
            req.metric.Inc(`ship.job.${jobName}.error`);
            this.instrumentationAgent.catchError(err, {
              job_id: job.id
            }, {
              job_name: job.data.name,
              organization: _.get(job.data.context, "query.organization"),
              ship: _.get(job.data.context, "query.ship")
            });
            callback(err);
          })
          .finally(() => {
            this.instrumentationAgent.endTransaction();
            const duration = process.hrtime(startTime);
            const ms = (duration[0] * 1000) + (duration[1] / 1000000);
            req.metric.val(`ship.job.${jobName}.duration`, ms);
          });
      });
    });
  }

  runMiddleware(req, res) {
    return Promise.fromCallback((callback) => {
      this.supply
        .each(req, res, callback);
    });
  }
}
