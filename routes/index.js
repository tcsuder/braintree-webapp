var express = require('express');
var app = express.Router();
var braintree = require('braintree');

//tyler's sandbox keys
var gateway = braintree.connect({
    environment: braintree.Environment.Sandbox,
    merchantId: "fsx6gdtxvn95nhz5",
    publicKey:  "bd9rd6g4gsxwykh2",
    privateKey: "e59a00b0ea5781ceb7384aba7c83c61c"
});

app.get('/', function(req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    var token = response.clientToken;
    res.render('index', {token: token});
  });
});

app.post("/process", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  var plan = req.body.plan;

  gateway.customer.create({
    paymentMethodNonce: nonce
  }, function (err, result) {
    if (result.success) {
      var token = result.customer.paymentMethods[0].token;

      gateway.transaction.sale({
        paymentMethodToken: token,
        amount: '1.00',
        recurring: true
      }, function (err, result) {
        res.render('result', {result: result});
      });
    }
  });
});

module.exports = app;
