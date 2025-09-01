"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Whiteboard from "@/feature/whiteboard";
import { initSocket } from "@/lib/socket";
import { useUserStore } from "@/stores/useUserStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  Circle,
  Download,
  Eraser,
  Minus,
  Pencil,
  Redo2,
  Square,
  Trash,
  Type,
  Undo2,
  Users,
} from "lucide-react";
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
  const [lineWidth, setLineWidth] = useState(3);
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [image, setImage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [showTooltip, setShowTooltip] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const onConnect = () => {
      console.log("connected:", socket.id);
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
  }, [user, id]);

  const handleClearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas?")) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.fillRect = "white";
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }
  };

  const undo = () => {
    setHistory((prev) => [...prev, elements[elements.length - 1]]);
    setElements((prev) => prev.slice(0, prev.length - 1));
  };

  const redo = () => {
    setElements((prev) => [...prev, history[history.length - 1]]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `whiteboard-${new Date().toISOString()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const tools = [
    { id: "pencil", label: "Pencil", icon: <Pencil size={18} /> },
    { id: "eraser", label: "Eraser", icon: <Eraser size={18} /> },
    { id: "line", label: "Line", icon: <Minus size={18} /> },
    { id: "rect", label: "Rectangle", icon: <Square size={18} /> },
    { id: "ellipse", label: "Circle", icon: <Circle size={18} /> },
    { id: "text", label: "Text", icon: <Type size={18} /> },
  ];

  const colors = [
    "#000000",
    "#ffffff",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#00ffff",
    "#ff00ff",
    "#c0c0c0",
    "#808080",
  ];

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-title">
            Collaborative Whiteboard
          </h1>
          <div className="flex items-center justify-center mt-2 gap-2 text-sm text-surface">
            <Users size={16} />
            <span>
              {onlineUsers} user{onlineUsers !== 1 ? "s" : ""} online
            </span>
            <span className="mx-2">•</span>
            <span>Room: {id}</span>
            {user?.presenter && (
              <>
                <span className="mx-2">•</span>
                <span className="bg-card px-2 py-1 rounded-full text-xs">
                  Presenter
                </span>
              </>
            )}
          </div>
        </motion.div>

        {user?.presenter && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full mb-6"
          >
            <Card className="w-full flex flex-col md:flex-row justify-between items-stretch gap-4 p-4 shadow-lg rounded-xl bg-card backdrop-blur-sm border-border">
              {/* Tool Selector */}
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <motion.button
                    key={t.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setShowTooltip(t.id)}
                    onMouseLeave={() => setShowTooltip(null)}
                    onClick={() => setTool(t.id)}
                    className={`relative flex items-center justify-center w-10 h-10 rounded-lg border transition-all cursor-pointer duration-200 
                    ${
                      tool === t.id
                        ? "bg-surface shadow-md"
                        : "bg-title hover:bg-title/80 text-background"
                    }`}
                  >
                    {t.icon}
                    <AnimatePresence>
                      {showTooltip === t.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute -top-10 px-2 py-1 bg-card text-xs text-title rounded-md whitespace-nowrap"
                        >
                          {t.label}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>

              {/* Color and Size Picker */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col">

                  <div className="flex gap-1">
                    {colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-6 h-6 rounded-full border-2 ${
                          color === c
                            ? "border-gray-800 scale-110"
                            : "border-gray-300"
                        } transition-all`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                    <motion.input
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="color"
                      value={color}
                      className="w-6 h-6 cursor-pointer rounded-full overflow-hidden border border-gray-300"
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex flex-col">

                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(parseInt(e.target.value))}
                    className="w-20"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={elements.length === 0}
                  onClick={undo}
                  className="flex items-center gap-1 border-border select-none cursor-pointer"
                >
                  <Undo2 size={16} /> Undo
                </Button>
                <Button
                  disabled={history.length < 1}
                  variant="outline"
                  onClick={redo}
                  className="flex items-center gap-1 border-border select-none cursor-pointer"
                >
                  <Redo2 size={16} /> Redo
                </Button>
                <Button
                  variant="outline"
                  onClick={handleClearCanvas}
                  className="flex items-center gap-1 bg-red-500 text-title hover:bg-red-600 select-none cursor-pointer"
                >
                  <Trash size={16} /> Clear
                </Button>
                <Button
                  variant="outline"
                  onClick={exportCanvas}
                  className="flex items-center gap-1 border-border select-none cursor-pointer"
                >
                  <Download size={16} /> Export
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full mt-4"
        >
          <div className="rounded-xl shadow-lg border-2 border-white bg-title p-2 md:p-4 overflow-hidden flex items-center justify-center">
            {user?.presenter ? (
              <Whiteboard
                socket={socket}
                tool={tool}
                canvasRef={canvasRef}
                ctxRef={ctxRef}
                setElements={setElements}
                color={color}
                elements={elements}
                lineWidth={lineWidth}
              />
            ) : (
              <div className="relative w-full h-[1409px] md:h-[1409px] flex items-center justify-center">
                {image ? (
                  <Image
                    fill
                    src={image}
                    unoptimized
                    alt="Whiteboard"
                    className="object-contain h-full w-full scale-[200%]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center w-full h-full text-surface">
                    <div className="animate-pulse mb-4 border-border border-3 p-3 rounded-full">
                      <Pencil size={48} />
                    </div>
                    <p className="text-lg animate-pulse">
                      Waiting for presenter to start drawing...
                    </p>
                    <p className="text-sm mt-1 text-surface">
                      You&apos;ll see the whiteboard here once they begin
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {!user?.presenter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-gray-600 text-sm"
          >
            <p>
              You are viewing the whiteboard. Only the presenter can make
              changes.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RoomPage;
