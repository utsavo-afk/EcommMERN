const User = require("./../models/user.model");
const braintree = require("braintree");
const config = require("./../configuration/config");
const logger = require("../utils/helpers/logger");

// initialise gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: config.braintreeId,
  publicKey: config.braintreePublicKey,
  privateKey: config.braintreePrivateKey,
});

const generateToken = async (req, res) => {
  try {
    let clientToken = await gateway.clientToken.generate({});
    return res.status(200).send(clientToken);
  } catch (error) {
    return res.status(400).send({ error: "Failed to generate payment token" });
  }
};

const processPayment = async (req, res) => {
  try {
    let newTransaction = await gateway.transaction.sale({
      amount: req.body.amount,
      paymentMethodNonce: req.body.nonce,
      options: {
        submitForSettlement: true,
      },
    });
    res.status(200).send(newTransaction);
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = { generateToken, processPayment };
