module.exports = function (app) {
  app.use("*", function (req, res) {
    res.status(404);
    res.send({ error: "endpoint not found" });
  });
};
