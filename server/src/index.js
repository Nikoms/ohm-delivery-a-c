var express = require("express");
const bodyParser = require("body-parser");
const resistancesController = require("./controllers/resistances");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/notfound");

function serve() {
  console.log("=== Initializing server");
  var app = express();
  app.use(bodyParser.json());
  app.use(cors());

  console.log("=== Initializing controllers");
  resistancesController(app);
  notFoundMiddleware(app);

  console.log("=== Starting server");
  app.listen(3000, () => console.log("listening on port 3000"));
}

serve();
