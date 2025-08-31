"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Whiteboard from "@/feature/whiteboard";
import { initSocket } from "@/lib/socket";
import { useUserStore } from "@/stores/useUserStore";
import { motion } from "framer-motion";
import { Minus, Pencil, Redo2, Square, Trash, Undo2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
const socket = initSocket();
const RoomPage = () => {
  const user = useUserStore((state) => state.user);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const onConnect = () => {
      console.log("✅ connected:", socket.id);
      socket.emit("userJoined", {
        roomId: id,
        name: user?.name,
        userId: user?.id,
        host: user?.host,
        presenter: user?.presenter,
      });
    };

    const onWhiteboard = (data) => {
      console.log("📩 whiteboardDataResponse", data);
      setImage(data.imageURL);
    };

    const onError = (err) => console.error("socket error:", err);

    socket.on("connect", onConnect);
    socket.on("whiteboardDataResponse", onWhiteboard);
    socket.on("connect_error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("whiteboardDataResponse", onWhiteboard);
      socket.off("connect_error", onError);
    };
  }, [user]);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillRect = "white";
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const undo = () => {
    setHistory((prev) => [...prev, elements[elements.length - 1]]);
    setElements((prev) => prev.slice(0, prev.length - 1));
  };

  const redo = () => {
    setElements((prev) => [...prev, history[history.length - 1]]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const tools = [
    { id: "pencil", label: "Pencil", icon: <Pencil size={18} /> },
    { id: "line", label: "Line", icon: <Minus size={18} /> },
    { id: "rect", label: "Rectangle", icon: <Square size={18} /> },
  ];

  return (
    <div className="w-full p-6 flex flex-col items-center">
      <h1 className="text-center text-4xl font-extrabold mb-6 tracking-wide">
        ✏️ Whiteboard
      </h1>
      <h1 className="mb-2">[Users Online: 0]</h1>

      {user?.presenter && (
        <Card className="w-full max-w-4xl flex flex-wrap justify-between items-center gap-4 p-4 shadow-lg rounded-2xl">
          {/* Tool Selector */}
          <div className="flex gap-3">
            {tools.map((t) => (
              <motion.button
                key={t.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTool(t.id)}
                className={`flex items-center text-black cursor-pointer gap-2 px-3 py-2 rounded-xl border transition-all duration-200 
                ${
                  tool === t.id
                    ? "bg-blue-500 text-white shadow-md"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {t.icon}
                <span className="hidden sm:inline">{t.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-3">
            <span className="font-medium">🎨 Color:</span>
            <motion.input
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              type="color"
              value={color}
              className="h-10 w-12 cursor-pointer rounded border p-1 shadow"
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

          {/* Undo / Redo */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={elements.length == 0}
              onClick={() => undo()}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Undo2 size={18} /> Undo
            </Button>
            <Button
              disabled={history.length < 1}
              variant="outline"
              onClick={() => redo()}
              className="flex items-center gap-1 cursor-pointer"
            >
              <Redo2 size={18} /> Redo
            </Button>
            <Button
              variant="outline"
              onClick={handleClearCanvas}
              className="flex items-center gap-1 cursor-pointer bg-red-600"
            >
              <Trash size={18} color="white" /> Clear Canvas
            </Button>
          </div>
        </Card>
      )}

      <div className="w-full mt-5 p-4">
        <div className="rounded-xl shadow-lg border bg-gray-50 p-3 overflow-hidden flex items-center justify-center">
          {user?.presenter ? (
            <Whiteboard
              socket={socket}
              tool={tool}
              canvasRef={canvasRef}
              ctxRef={ctxRef}
              setElements={setElements}
              color={color}
              elements={elements}
            />
          ) : (
            <div className="relative w-full h-[1000px]">
              {image ? (
                <Image fill src={image} unoptimized alt="Whiteboard" />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-sm text-gray-500">
                  Waiting for presenter…
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default RoomPage;
