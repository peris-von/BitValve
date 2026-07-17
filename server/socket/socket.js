import { Server } from "socket.io";

let io;

// Stores connected users
const clients = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ Client Connected: ${socket.id}`);

    socket.on("register", (requestId) => {
      clients.set(requestId, socket.id);

      console.log(`Registered ${requestId} -> ${socket.id}`);
    });

    socket.on("disconnect", () => {
      console.log(`❌ Client Disconnected: ${socket.id}`);

      for (const [key, value] of clients.entries()) {
        if (value === socket.id) {
          clients.delete(key);
          break;
        }
      }
    });
  });

  return io;
};

export const getIO = () => io;

export const getClientSocket = (requestId) => {
  return clients.get(requestId);
};
