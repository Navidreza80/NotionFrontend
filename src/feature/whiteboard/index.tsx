import { useParams } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

const Whiteboard = ({
  canvasRef,
  color,
  socket,
  tool,
  ctxRef,
  elements,
  setElements,
  lineWidth,
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");

    // Set initial context properties
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useEffect(() => {
    ctxRef.current.lineWidth = lineWidth;
  }, [lineWidth]);

  useLayoutEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    if (elements.length > 0) {
      ctxRef.current.clearRect(
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );
    }

    elements.forEach((element) => {
      if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: element.strokeWidth || lineWidth,
              roughness: 0,
            }
          )
        );
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: element.strokeWidth || lineWidth,
              roughness: 0,
            }
          )
        );
      } else if (element.type === "pencil") {
        roughCanvas.linearPath(element.path, {
          stroke: element.stroke,
          strokeWidth: element.strokeWidth || lineWidth,
          roughness: 0,
        });
      } else if (element.type === "ellipse") {
        // Calculate center and radii for ellipse
        const centerX = element.offsetX + element.width / 2;
        const centerY = element.offsetY + element.height / 2;
        const radiusX = Math.abs(element.width) / 2;
        const radiusY = Math.abs(element.height) / 2;

        // Draw ellipse using rough.js
        roughCanvas.draw(
          roughGenerator.ellipse(centerX, centerY, radiusX * 2, radiusY * 2, {
            stroke: element.stroke,
            strokeWidth: element.strokeWidth || lineWidth,
            roughness: 0,
          })
        );
      } else if (element.type === "eraser") {
        // For eraser, we need to use native canvas operations
        const ctx = canvasRef.current.getContext("2d");
        ctx.save();
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(255,255,255,1)";
        ctx.lineWidth = element.strokeWidth || lineWidth;
        ctx.beginPath();
        ctx.moveTo(element.path[0][0], element.path[0][1]);

        for (let i = 1; i < element.path.length; i++) {
          ctx.lineTo(element.path[i][0], element.path[i][1]);
        }

        ctx.stroke();
        ctx.restore();
      }
    });

    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData", { roomId: id, imageURL: canvasImage });
  }, [elements, lineWidth]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      setElements((prev) => [
        ...prev,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
          strokeWidth: lineWidth,
        },
      ]);
    } else if (tool === "line") {
      setElements((prev) => [
        ...prev,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
          strokeWidth: lineWidth,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prev) => [
        ...prev,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
          strokeWidth: lineWidth,
        },
      ]);
    } else if (tool === "ellipse") {
      setElements((prev) => [
        ...prev,
        {
          type: "ellipse",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
          strokeWidth: lineWidth,
        },
      ]);
    } else if (tool === "eraser") {
      setElements((prev) => [
        ...prev,
        {
          type: "eraser",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: "#FFFFFF", // White color for eraser
          strokeWidth: lineWidth,
        },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil" || tool === "eraser") {
      const lastElement = elements[elements.length - 1];
      const newPath = [...lastElement.path, [offsetX, offsetY]];

      setElements((prev) =>
        prev.map((el, index) => {
          if (index === elements.length - 1) {
            return {
              ...el,
              path: newPath,
            };
          } else {
            return el;
          }
        })
      );
    } else if (tool === "line") {
      setElements((prev) =>
        prev.map((el, index) => {
          if (index === elements.length - 1) {
            return {
              ...el,
              width: offsetX,
              height: offsetY,
            };
          } else {
            return el;
          }
        })
      );
    } else if (tool === "rect" || tool === "ellipse") {
      setElements((prev) =>
        prev.map((el, index) => {
          if (index === elements.length - 1) {
            return {
              ...el,
              width: offsetX - el.offsetX,
              height: offsetY - el.offsetY,
            };
          } else {
            return el;
          }
        })
      );
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{
        cursor:
          tool === "eraser"
            ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M10 10l6.5 6.5'/%3E%3Cpath d='M9.5 9.5L16 16'/%3E%3Cpath d='M19 21L21 19'/%3E%3Cpath d='M10 10l-8.5 8.5'/%3E%3Cpath d='M9.5 9.5L3 16'/%3E%3Cpath d='M14 14l6.5 6.5'/%3E%3Cpath d='M13.5 13.5L20 20'/%3E%3C/svg%3E") ${
                lineWidth / 2
              } ${lineWidth / 2}, auto`
            : "crosshair",
      }}
    >
      <canvas ref={canvasRef} className="overflow-hidden"></canvas>
    </div>
  );
};

export default Whiteboard;
