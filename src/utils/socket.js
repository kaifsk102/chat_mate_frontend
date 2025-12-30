"use client";

import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  socket = io("http://localhost:3001", {
    auth: { token },
    transports: ["websocket"],
  });
  return socket;
};
