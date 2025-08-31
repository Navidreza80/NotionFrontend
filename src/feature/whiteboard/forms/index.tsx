"use client";

import { initSocket } from "@/lib/socket";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Socket } from "socket.io-client";
import CreateRoom from "./create-room";
import JoinRoom from "./join-room";

// single socket instance (global, not per render)
const socket: Socket = initSocket();

const Forms = () => {
  // track which tab is active
  const [activeTab, setActiveTab] = useState<"create" | "join">("create");

  useEffect(() => {
    const handleUserJoined = (data: {
      success: boolean;
      roomId?: string;
      message?: string;
    }) => {
      if (data.success && data.roomId) {
        toast.success(`Successfully joined room: ${data.roomId}`);
        console.log("User joined successfully", data);
      } else {
        toast.error(data.message || "Failed to join room.");
        console.error("Error joining room:", data.message);
      }
    };

    socket.on("userIsJoined", handleUserJoined);

    return () => {
      socket.off("userIsJoined", handleUserJoined);
    };
  }, []);

  const formProps = { socket };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-8 space-y-6">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setActiveTab("create")}
              className={`p-3 rounded-lg font-semibold text-center transition-colors duration-300 cursor-pointer ${
                activeTab === "create"
                  ? "bg-surface hover:bg-surface/80"
                  : "bg-white hover:bg-white/80 text-background shadow-md"
              }`}
            >
              Create Room
            </button>
            <button
              onClick={() => setActiveTab("join")}
              className={`p-3 rounded-lg font-semibold text-center transition-colors duration-300 cursor-pointer ${
                activeTab === "join"
                  ? "bg-surface hover:bg-surface/80"
                  : "bg-white hover:bg-white/80 text-background shadow-md"
              }`}
            >
              Join Room
            </button>
          </div>

          {/* Render Active Form */}
          <div>
            {activeTab === "create" ? (
              <CreateRoom {...formProps} />
            ) : (
              <JoinRoom {...formProps} />
            )}
          </div>
        </div>
      </div>

      {/* Toast container */}
      <Toaster position="top-center" />
    </div>
  );
};

export default Forms;
