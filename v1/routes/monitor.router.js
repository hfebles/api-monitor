const { Router } = require("express");
const router = Router();

const {
  exchangesName,
  updateJson,
} = require("../controllers/monitor.controller");

router.get("/", async function (req, res) {
  try {
    const { objectName } = await exchangesName();
    res.status(200).send(objectName);
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

// router.get("/update", async function (req, res) {
//   try {
//     await updateJson();
//     res.status(200).send({ response: true });
//   } catch (e) {
//     res.status(500).send({ error: e });
//   }
// });

module.exports = router;
