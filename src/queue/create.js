import _ from "lodash";

export default function queueCreate(queueAdapter, req, jobName, jobPayload, options = {}) {
  const context = _.pick(req, ["query", "hostname"]);
  return queueAdapter.create("queueApp", {
    name: jobName,
    payload: jobPayload,
    context
  }, options);
}
