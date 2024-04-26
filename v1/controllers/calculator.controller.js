const { searchParams } = require("../controllers/search.controller");

const calculator = async (monitor, amount, currency) => {
  const { data } = await searchParams(monitor);
  var total = "";
  if (currency == "bs" || currency == "ves") {
    total = data.price * amount;
  } else {
    total = amount / data.price;
  }

  return {
    response: { response: "OK", status: 200 },
    data: {
      price: data.price,
      amount: amount,
      total: total,
      currency: currency,
    },
  };
};

module.exports = {
  calculator,
};
