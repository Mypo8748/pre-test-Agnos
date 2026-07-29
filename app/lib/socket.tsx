import { Server } from "socket.io";
import { createServer } from "node:http";
import express from "express";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("sendMessage", (msg) => {
    console.log("Message:", msg);
    io.emit("receiveMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(3000, () => {
  console.log("Socket server running on port 3000");
});