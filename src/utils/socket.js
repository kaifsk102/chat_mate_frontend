"use client";

import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  socket = io("https://chat-mate-backend-gv2e.onrender.com", {
    auth: { token },
    transports: ["websocket"],
  });
  return socket;
};
