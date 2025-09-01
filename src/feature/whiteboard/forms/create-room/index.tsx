"use client";

import { uuid } from "@/helper/generate-random-uuid";
import { useUserStore } from "@/stores/useUserStore";
import { TypedSocket } from "@/types/socket.type";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { FaCopy, FaSyncAlt } from "react-icons/fa";

const CreateRoom = ({ socket }: { socket: TypedSocket }) => {
  const user = useSession();

  const setUser = useUserStore((state) => state.setUser);
  const [roomId, setRoomId] = useState(uuid());
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  // Copy room ID to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // Generate a new unique room ID
  const handleGenerateNewId = () => {
    setRoomId(uuid());
    setIsCopied(false);
  };

  // Create the room and join as host/presenter
  const handleCreateRoom = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const roomData = {
      name: user?.data?.user.name || "User",
      roomId,
      userId: user?.data?.user.id || "Guest",
      host: true,
      presenter: true,
    };

    setUser(roomData);
    socket.emit("userJoined", roomData);
    router.push(`/whiteboard/${roomId}`);
  };

  return (
    <form className="w-full mt-4 space-y-6" onSubmit={handleCreateRoom}>
      {/* Room Code Field */}
      <div>
        <label htmlFor="room-code" className="block text-sm font-medium mb-2">
          Your Room Code
        </label>
        <div className="relative flex items-center">
          <input
            id="room-code"
            ref={inputRef}
            type="text"
            className="block w-full rounded-md shadow-sm border border-border sm:text-sm p-3 bg-background"
            disabled
            value={roomId}
          />
          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            {/* Generate new code */}
            <button
              type="button"
              onClick={handleGenerateNewId}
              className="inline-flex items-center rounded-md bg-white hover:bg-white/80 text-background cursor-pointer px-3 text-sm font-medium transition-colors"
              title="Generate New Code"
            >
              <FaSyncAlt />
            </button>
            {/* Copy code */}
            <button
              type="button"
              onClick={handleCopy}
              className="ml-1.5 inline-flex items-center rounded-md bg-surface px-3 cursor-pointer text-sm font-medium text-white hover:bg-surface/80 transition-colors"
              title="Copy Code"
            >
              <FaCopy />
            </button>
          </div>
        </div>
        {isCopied && (
          <p className="text-green-600 text-xs mt-1">Copied to clipboard!</p>
        )}
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer flex justify-center py-3 px-4 rounded-md shadow-sm text-sm font-medium bg-surface hover:bg-surface/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-surface/8- disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Creating Room..." : "Create & Join Room"}
      </button>
    </form>
  );
};

export default CreateRoom;
