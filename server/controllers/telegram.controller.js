import requests from "../storage/requests.js";
import { getIO, getClientSocket } from "../socket/socket.js";

export const telegramWebhook = async (req, res) => {
  try {
    const callback = req.body.callback_query;

    if (!callback) {
      return res.sendStatus(200);
    }

    const data = callback.data;

    const [action, requestId] = data.split(":");

    const request = requests.get(requestId);

    if (!request) {
      return res.sendStatus(200);
    }

    request.status =
      action === "approve" ? "approved" : "rejected";

    const io = getIO();

    const socketId = getClientSocket(requestId);

    if (socketId) {
      io.to(socketId).emit("ticketStatus", {
        requestId,
        status: request.status,
      });

      console.log(
        `Sent ${request.status} to ${socketId}`
      );
    }

    requests.set(requestId, request);

    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};