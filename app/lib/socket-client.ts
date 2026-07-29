import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3000", {
      reconnectionAttempts: 1,
      reconnectionDelay: 100,
      timeout: 1000,
      transports: ["websocket", "polling"],
      autoConnect: false,
    }) as Socket;

    socket.on("connect", () => {
      console.log("Socket connected:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.warn("Socket not available, using local fallback:", err.message);
    });
  }

  return socket;
};
