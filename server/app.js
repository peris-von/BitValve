require("dotenv").config();
const express = require("express");
const paymentRoutes = require("./routes/payment.routes");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/payments", paymentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
