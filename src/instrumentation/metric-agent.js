import _ from "lodash";

export default class MetricAgent {
  constructor(req, instrumentationAgent) {
    this.metrics = instrumentationAgent.metrics;
    this.dogapi = instrumentationAgent.dogapi;
    this.context = _.get(req, "hull.client") ? req.hull.client.configuration() : {};
  }

  val(metric, value = 1) {
    if (!this.metrics) {
      return null;
    }
    try {
      return this.metrics.gauge(metric, parseFloat(value), this.getMetricTags());
    } catch (err) {
      console.warn("metricVal.error", err);
    }
    return null;
  }

  inc(metric, value = 1) {
    if (!this.metrics) {
      return null;
    }
    try {
      return this.metrics.increment(metric, parseFloat(value), this.getMetricTags());
    } catch (err) {
      console.warn("metricInc.error", err);
    }
    return null;
  }

  event({ title, text = "", properties = {} }) {
    if (!this.dogapi) {
      return null;
    }
    return this.dogapi.event.create(`${this.manifest.name}.${title}`, text, _.merge(properties, {
      tags: this.getMetricTags()
    }));
  }

  getMetricTags() {
    const { organization = "none", id = "none" } = this.context;
    const hullHost = organization.split(".").slice(1).join(".");
    const tags = [
      "source:ship", `ship_version:${this.manifest.version}`, `ship_name:${this.manifest.name}`,
      `ship_env:${process.env.NODE_ENV || "production"}`, `hull_host:${hullHost}`,
      `organization:${organization}`, `ship:${id}`
    ];
    return tags;
  }
}
