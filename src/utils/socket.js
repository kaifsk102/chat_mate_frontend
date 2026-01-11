"use client";

import { io } from "socket.io-client";

export const connectSocket = (token) => {
  return io(process.env.NEXT_PUBLIC_API_BASE_URL, {
    auth: { token }
  });
};
