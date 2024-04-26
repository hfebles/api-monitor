const { Router } = require("express");
const router = Router();

const { exchangesName } = require("../controllers/monitor.controller");

router.get("/", async function (req, res) {
  try {
    const { objectName } = await exchangesName();
    res.status(200).send(objectName);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

module.exports = router;
