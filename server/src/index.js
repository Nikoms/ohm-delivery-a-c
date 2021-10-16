const shortid = require("shortid");
var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const Utils = require("./utils");
app.use(bodyParser.json());
const cors = require("cors");
app.use(cors());

function serialize(ohm) {
  return {
    description: ohm.description,
    client: ohm.client,
    comment: ohm.comment,
    history: ohm.history
  };
}

function serve() {
  app.get("/ohms/:id", async (req, res) => {
    const ohm = await Utils.getOhmById(req.params.id);

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
      const ohm = await Utils.setOhmStatus(
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

  app.listen(3000, () => console.log("listening on port 3000"));
}

serve();
