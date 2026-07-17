const express = require("express");
const router = express.Router();

const { initiatePayment } = require("../controllers/payment.controller");

router.post("/", initiatePayment);

module.exports = router;