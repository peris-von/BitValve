const axios = require("axios");

exports.initiatePayment = async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;
    console.log(amount);
    console.log(phoneNumber);

    const credentials = Buffer.from(
      `${process.env.PAYHERO_USERNAME}:${process.env.PAYHERO_PASSWORD}`,
    ).toString("base64");
    console.log(`Basic ${credentials}`);
    const response = await axios.post(
      "https://api.payhero.africa/api/v2/payments",
      {
        amount: amount,
        phone_number: phoneNumber,
        provider: "m-pesa",
        network_code: "63902",
        channel_id: 10459,
        account_id: 10860,
        external_reference: `NYOTA-${Date.now()}`,
        callback_url: "https://your-domain.com/api/payments/webhook",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
      },
    );

    res.status(200).json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);

    res.status(500).json({
      success: false,
      message: "Payment initiation failed.",
      error: err.response?.data || err.message,
    });
  }
};
