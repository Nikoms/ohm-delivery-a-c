const ResistancesRegistry = require("../registries/resistances");

function serialize(ohm) {
  return {
    description: ohm.description,
    client: ohm.client,
    comment: ohm.comment,
    history: ohm.history
  };
}

module.exports = function (app) {
  app.get("/ohms/:id", async (req, res) => {
    const ohm = await ResistancesRegistry.getOhmById(req.params.id);

    if (ohm) {
      res.send({
        ...serialize(ohm),
        isDriver: req.params.id == ohm.driverCode
      });
    } else {
      res.status(404).send({ error: "Resistance not found" });
    }
  });

  app.patch("/ohms/:id", async (req, res) => {
    try {
      const ohm = await ResistancesRegistry.setOhmStatus(
        req.params.id,
        req.body.status,
        req.body.rejectionReason
      );

      if (ohm) {
        res.send({
          ...serialize(ohm),
          isDriver: req.params.id == ohm.driverCode
        });
      } else {
        res.status(404).send({ error: "Resistance not found" });
      }
    } catch (e) {
      res.status(500).send({ error: "Unable to change status" });
    }
  });
};
