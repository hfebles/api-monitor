const axios = require("axios");
const urlBase = process.env.URL_BASE;

const exchangesName = async () => {
  const response = await axios.get(urlBase + "coins/latest");
  const objectName = [];
  const objectData = [];
  for (let i in response.data) {
    if (response.data[i].currency == "VES") {
      objectName.push(response.data[i].name);
      objectData.push(response.data[i]);
    }
  }
  return { objectName, objectData };
};

module.exports = { exchangesName };
