const low = require("lowdb");
const FileAsync = require("lowdb/adapters/FileAsync");
const adapter = new FileAsync("db.json");
const config = require("../db.config.json");

const db = (async () => {
  const _db = await low(adapter);
  await _db.defaults(config).write();
  return _db;
})();

module.exports = {
  getOhmById: async function (code) {
    const _db = await db;

    const ohm = _db
      .get("ohms")
      .find((r) => r.trackingId == code || r.driverCode == code)
      .value();

    return ohm;
  },
  setOhmStatus: async function (code, status, details) {
    const _db = await db;

    const ohm = _db
      .get("ohms")
      .find((r) => r.driverCode == code)
      .value();

    if (ohm) {
      let lastStatus = ohm.history.slice(-1)[0].state;

      let statusFlow = [
        ["CREATED"],
        ["PREPARING"],
        ["READY"],
        ["IN_DELIVERY"],
        ["DELIVERED", "REFUSED"]
      ];

      let currentStatus = statusFlow.findIndex((statuses) =>
        statuses.includes(lastStatus)
      );

      let nextStatuses =
        currentStatus < statusFlow.length - 1
          ? statusFlow[currentStatus + 1]
          : [];

      if (nextStatuses.includes(status)) {
        ohm.history.push({
          state: status,
          at: new Date().getTime().toString()
        });

        if (status == "REFUSED") {
          ohm.comment = details;
        }

        _db.write();
        return ohm;
      } else {
        throw `Invalid status: ${status}`;
      }
    }

    return ohm;
  }
};
