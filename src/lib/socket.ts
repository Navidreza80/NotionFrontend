import { TypedSocket } from "@/types/socket.type";
import { io } from "socket.io-client";

let socket: TypedSocket;
export function initSocket(): TypedSocket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WS_URL ?? "http://127.0.0.1:3000", {
      forceNew: true,
      reconnectionAttempts: Infinity,
      timeout: 10000,
      transports: ["websocket"],
    });
    socket.on("connect", () => console.log("socket connected", socket.id));
  }
  return socket;
}
