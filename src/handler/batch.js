import Promise from "bluebird";
import CSVStream from "csv-stream";
import JSONStream from "JSONStream";
import request from "request";
import ps from "promise-streams";
import BatchStream from "batch-stream";


/**
 * @param {Object} options { url, format, chunkSize }
 * @param {Function} callback returning a Promise
 * @return Promise
 */
export default function BatchHandler({ url, format, chunkSize }, callback) {
  if (!url) return Promise.reject(new Error("Missing URL"));
  const decoder = format === "csv" ? CSVStream.createStream({ escapeChar: "\"", enclosedChar: "\"" }) : JSONStream.parse();

  const batch = new BatchStream({ size: chunkSize });

  return request({ url })
    .pipe(decoder)
    .pipe(batch)
    .pipe(ps.map({ concurrent: 2 }, (...args) => {
      try {
        return callback(...args);
      } catch (e) {
        this.hullClient.logger.error("ExtractAgent.handleExtract.error", e);
        // throw e;
        return Promise.reject(e);
      }
    }))
    .wait();
}
