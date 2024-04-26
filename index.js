require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const version = process.env.version || "v1";

const monitorRouter = require(`./${version}/routes/monitor.router`);
const searchRouter = require(`./${version}/routes/search.router`);
const calculatorRouter = require(`./${version}/routes/calculator.router`);

app.use(express.json());

const enforceAPITag = (req, res, next) => {
  if (!req.url.startsWith("/api")) {
    return res.status(400).send({
      status: 400,
      message: "La ruta no es válida. Debe incluir /api en la URL.",
    });
  }

  next();
};
app.use(enforceAPITag);

app.use(`/api/monitors`, monitorRouter);
app.use(`/api/search`, searchRouter);
app.use(`/api/calculator`, calculatorRouter);

app.get("/api", async (req, res) => {
  res.status(200).send({
    message: "Welcome to my api",
    version: `Current Version: ${version}`,
    documentation: `http://localhost:${port}/api/docs`,
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, x-requested-with");
  res.header("Access-Control-Allow-Methods", "GET");
  //   res.header("Allow", "GET");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
