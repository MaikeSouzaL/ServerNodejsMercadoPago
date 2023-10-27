// Constantes
const express = require("express");
const bodyParser = require("body-parser");
var mercadopago = require("mercadopago");
const cors = require("cors");
const { json } = require("body-parser");
const config = require("./config/index.json");

let app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mercadopago.configure({
  access_token: "ENV_ACCESS_TOKEN",
});

// Routes
app.post("/payment", (req, res) => {
  // console.log(`Aqui estamos recebendo la do FrontEnd`, req.body);
  // res.send(JSON.stringify(`Estamos retornando ao FrontEnd: ${req.body.price}`));

  let preference = {
    items: [
      {
        title: "Blue shirt",
        quantity: 10,
        currency_id: "BRL",
        unit_price: 10,
      },
    ],
    payer: {
      email: "demo@mail.com",
    },
    payment_methods: {
      installments: 3,
    },
  };
  mercadopago.Preference.create(preference)
    .then(function (data) {
      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
    });
});

let port = process.env.port || 3333;
app.listen(port, (req, res) => {
  console.log("servidor Rondando");
});
