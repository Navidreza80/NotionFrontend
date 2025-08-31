import { Socket } from "socket.io-client";

export interface ServerToClientEvents {
  whiteboardDataResponse: (data: { imageURL: string }) => void;
  userIsJoined: (data: { success: boolean }) => void;
}

export interface ClientToServerEvents {
  userJoined: (data: {
    name: string;
    roomId: string;
    userId: string;
    host: boolean;
    presenter: boolean;
  }) => void;
  whiteboardData: (data: { roomId: string; imageURL: string }) => void;
}

export type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
