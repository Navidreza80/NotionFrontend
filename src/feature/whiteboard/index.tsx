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
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

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
      if (element.type == "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 3,
              roughness: 0,
            }
          )
        );
      } else if (element.type == "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 3,
              roughness: 0,
            }
          )
        );
      } else if (element.type == "pencil") {
        roughCanvas.linearPath(element.path, {
          stroke: element.stroke,
          strokeWidth: 3,
          roughness: 0,
        });
      }
    });
    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData", { roomId: id, imageURL: canvasImage });
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool == "pencil") {
      setElements((prev) => [
        ...prev,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool == "line") {
      setElements((prev) => [
        ...prev,
        {
          type: "line",
          offsetX,
          offsetY,
          width: offsetX,
          height: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool == "rect") {
      setElements((prev) => [
        ...prev,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    if (isDrawing) {
      if (tool == "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        setElements((prev) =>
          prev.map((el, index) => {
            if (index == elements.length - 1) {
              return {
                ...el,
                path: newPath,
              };
            } else {
              return el;
            }
          })
        );
      } else if (tool == "line") {
        setElements((prev) =>
          prev.map((el, index) => {
            if (index == elements.length - 1) {
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
      } else if (tool == "rect") {
        setElements((prev) =>
          prev.map((el, index) => {
            if (index == elements.length - 1) {
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
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <canvas ref={canvasRef} className="overflow-hidden"></canvas>
    </div>
  );
};
export default Whiteboard;
