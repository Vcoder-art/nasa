const express = require("express");
const app = express.Router();
const {default:axios} = require("axios")

app.get("/get-order-status/:order_id", async (req, res) => {
  const { order_id } = req.params;

  const options = {
    method: "GET",
    url: `https://api.cashfree.com/pg/orders/${order_id}/payments`,
    headers: {
      accept: "application/json",
      "x-api-version": "2022-09-01",
      "x-client-id": "733936538bd77bb9b19ec42f039337",
      "x-client-secret": "224701d6a17cdeb599b49c40bf54d0fda2b5d3d4",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send(error);
    });
});


module.exports = app;
