"use client";

import { useUserStore } from "@/stores/useUserStore";
import { UserData } from "@/types/userData.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Socket } from "socket.io-client";

interface JoinRoomProps {
  socket: Socket;
}

const JoinRoom = ({ socket }: JoinRoomProps) => {
  const user = useSession();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  // Handle Form Submission
  const handleRoomJoin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset previous errors

    // Validate input
    if (!roomId.trim()) {
      setError("Please enter a room code.");
      return;
    }

    setIsLoading(true);

    // Map Session into our UserData type
    const roomData: UserData = {
      name: user.data?.user.name ?? "Anonymous",
      roomId: roomId.trim(),
      userId: user.data?.user.id ?? "guest-" + Date.now(),
      host: false,
      presenter: false,
    };

    // Update Zustand store & notify server
    setUser(roomData);
    socket.emit("userJoined", roomData);

    // Redirect to room
    router.push(`/whiteboard/${roomId.trim()}`);
  };

  return (
    <form className="w-full mt-4 space-y-6" onSubmit={handleRoomJoin}>
      {/* Room Code Input */}
      <div>
        <label htmlFor="room-id" className="block text-sm font-medium mb-2">
          Enter Room Code
        </label>
        <input
          id="room-id"
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
            if (error) setError(""); // Clear error when user types
          }}
          type="text"
          placeholder="e.g., 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed"
          className={`block bg-background w-full rounded-md border border-border shadow-sm p-3 sm:text-sm ${
            error ? "border-red-500 ring-red-500" : ""
          }`}
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
      </div>

      {/* Join Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium bg-surface hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500  disabled:bg-surface/80 cursor-pointer disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Joining..." : "Join Room"}
      </button>
    </form>
  );
};

export default JoinRoom;
