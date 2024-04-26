const axios = require("axios");
const urlBase = process.env.URL_BASE;
const fs = require("fs");

const file = async () => {
  const date = new Date();
  const updatedAt = date
    .toISOString()
    .slice(0, 10)
    .replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, "$1$2$3");
  const data = await fs.promises.readFile(
    `./v1/data/data_${updatedAt}.json`,
    "utf8"
  );
  return JSON.parse(data);
};

const exchangesName = async () => {
  //const response = await axios.get(urlBase + "coins/latest");
  const response = await file();
  const objectName = [];
  const objectData = [];
  for (let i in response) {
    if (response[i].currency == "VES") {
      objectName.push(response[i].name);
      objectData.push(response[i]);
    }
  }
  return { objectName, objectData };
};

const updateJson = async () => {
  const response = await axios.get(urlBase + "coins/latest");
  const date = new Date();
  const updatedAt = date
    .toISOString()
    .slice(0, 10)
    .replace(/(\d{4})-(\d{1,2})-(\d{1,2})/, "$1$2$3");

  fs.writeFile(
    `./v1/data/data_${updatedAt}.json`,
    JSON.stringify(response.data),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      return true;
    }
  );
};

module.exports = { exchangesName, updateJson };
