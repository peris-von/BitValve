import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { initializeSocket } from "./socket/socket.js";
import ticketRoutes from "./routes/ticket.routes.js";
import { getIO } from "./socket/socket.js";
import telegramRoutes from "./routes/telegram.routes.js";
dotenv.config();

const app = express();

const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(express.json());
app.use("/api", ticketRoutes);
app.use("/api", telegramRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Ticket Verification Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;
initializeSocket(server);
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { app, server };
