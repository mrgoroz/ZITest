const express = require("express");
const ejs = require("ejs");
const paypal = require("paypal-rest-sdk");
var cors = require("cors");

paypal.configure({
  mode: "sandbox",
  client_id:
    "AXJgZEXlDOZsa1rafNF57wUTZHgdXKcYD68RWTv3WD1EkgmJdR6TVgotIQKlJ2UFRPRDC5rUUTn-C-F0",
  client_secret:
    "EBzqup1Dq7S-UyM5PsSndi2bOzYGzKHZreU9DL9-eXIpdXnF2kDpMDkwQ1evvddXEBtoj5hxsmL1RLVN"
});

const app = express();

app.use(cors());

app.set("view engine", "ejs");

app.get("/", (req, res) => res.render("index"));

// to get user tokens from paypal
app.post("/pay", (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/cancel"
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "Adidas shoe",
              sku: "001",
              price: "25.00",
              currency: "USD",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "USD",
          total: "25.00"
        },
        description: "Hat for the best team ever"
      }
    ]
  };

  paypal.payment.create(create_payment_json, function(error, payment) {
    if (error) {
      throw error;
    } else {
      payment.links.forEach(link => {
        if (link.rel === "approval_url") {
          console.log(link);
          res.redirect(link.href);
        }
      });
    }
  });
});

// to actually make the payment
app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00"
        }
      }
    ]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function(
    error,
    payment
  ) {
    if (error) {
      console.log(error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));
      res.send("Success");
    }
  });
});

app.get("/cancel", (req, res) => res.send("Cancelled"));

app.listen(3001, () => console.log("Server Started"));
