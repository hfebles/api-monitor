const { Router } = require("express");
const router = Router();

const { searchParams } = require("../controllers/search.controller");

router.get("/:monitor", async (req, res) => {
  const { monitor } = req.params;
  console.log(monitor);
  try {
    const { response, data } = await searchParams(monitor);
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
