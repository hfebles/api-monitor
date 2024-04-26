const { Router } = require("express");
const router = Router();

const { calculator } = require("../controllers/calculator.controller");

router.get("/:monitor/:amount/:currency", async (req, res) => {
  const { monitor, amount, currency } = req.params;
  try {
    const { response, data } = await calculator(
      monitor,
      amount,
      currency.toLowerCase()
    );
    if (response.status === 200) {
      res.status(response.status).send(data);
    } else {
      res.status(response.status).send(response);
    }
  } catch (e) {
    res.status(500).send({ error: e });
  }
});

module.exports = router;
