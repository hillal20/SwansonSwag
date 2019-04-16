const axios = require("axios");

const allQuotes = async () => {
  let allQuotes;
  const promise = await axios.get(
    "https://ron-swanson-quotes.herokuapp.com/v2/quotes/100"
  );

  return promise.data;
};
module.exports = allQuotes;
