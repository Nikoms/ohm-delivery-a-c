const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const config = require("../../db.config.json");

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})();

const STATUS_FLOW = [["CREATED"], ["PREPARING"], ["READY"], ["IN_DELIVERY"], ["DELIVERED", "REFUSED"]];

/**
 * Check if ohm can transition from its current status to "status"
 */
function canTransitionTo(ohm, status) {
  let lastStatus = ohm.history.slice(-1)[0].state;
  let currentStatus = STATUS_FLOW.findIndex((statuses) => statuses.includes(lastStatus));
  let nextStatuses = currentStatus < STATUS_FLOW.length - 1 ? STATUS_FLOW[currentStatus + 1] : [];

  return nextStatuses.includes(status);
}

module.exports = {
  getOhmById: async function (code) {
    const _db = await db;

    const ohm = _db
      .get("ohms")
      .find((r) => r.trackingId == code || r.driverCode == code)
      .value();

    return ohm;
  },
  setOhmStatus: async function (code, status, rejectionReason) {
    const _db = await db;

    const ohm = _db
      .get("ohms")
      .find((r) => r.driverCode == code)
      .value();

    if (ohm) {
      if (canTransitionTo(ohm, status)) {
        let newHistoryItem = {
          state: status,
          at: new Date().getTime().toString()
        };
        if (status == "REFUSED") {
          newHistoryItem.rejectionReason = rejectionReason;
        }

        ohm.history.push(newHistoryItem);

        if (process.env.NODE_ENV != "test") _db.write();
        return ohm;
      } else {
        throw `Invalid status: ${status}`;
      }
    }

    return ohm;
  },
  addComment: async function (code, comment) {
    const _db = await db;

    const ohm = _db
      .get("ohms")
      .find((r) => r.trackingId == code || r.driverCode == code)
      .value();

    if (ohm) {
      let isDriver = code == ohm.driverCode;
      ohm.comments.push([isDriver, comment]);

      if (process.env.NODE_ENV != "test") _db.write();
    }

    return ohm;
  }
};
