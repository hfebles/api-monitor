const axios = require("axios");
const urlBase = process.env.URL_BASE;
const { exchangesName } = require("../controllers/monitor.controller");

const searchParams = async (param) => {
  const objs = await exchangesName();

  const obj = objs.objectName.map((name) => {
    const monitor = name.trim();
    const searchName = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "");
    return { monitor, searchName };
  });
  for (let i = 0; i < obj.length; i++) {
    if (param == obj[i].searchName) {
      response = {
        response: "OK",
        status: 200,
      };
      data = {
        name: objs.objectData[i].name,
        currency: objs.objectData[i].currency,
        price: objs.objectData[i].price,
        priceBuy: objs.objectData[i].priceBuy,
        priceSell: objs.objectData[i].priceSell,
        updatedAt: objs.objectData[i].updatedAt,
      };
      rst = { response, data };
    } else {
      rst = {
        response: { result: "NOK", status: 404, mesagge: "No encontrado" },
      };
    }
  }

  return rst;
};

module.exports = {
  searchParams,
};
