import queueCreate from "../create";

export default class BaseAdapter {
  constructor() {
    this.middleware = this.middleware.bind(this);
  }

  middleware(req, res, next) {
    req.hull = req.hull || {};
    req.hull.queue = req.hull.queue || queueCreate.bind(null, this, req);
    return next();
  }
}
