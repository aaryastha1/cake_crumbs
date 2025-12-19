import React, { useEffect, useRef } from "react";

const CakePreview = ({ baseImage, maskImage, color = "#ff4c8a", width = 300 }) => {
  const canvasRef = useRef();

  useEffect(() => {
    if (!baseImage || !maskImage) return; // Don't draw if images are missing

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const base = new Image();
    const mask = new Image();

    base.crossOrigin = "anonymous"; // avoid CORS issues
    mask.crossOrigin = "anonymous";

    base.src = baseImage;
    mask.src = maskImage;

    base.onload = () => {
      const scale = width / base.width;
      canvas.width = base.width * scale;
      canvas.height = base.height * scale;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(base, 0, 0, canvas.width, canvas.height);

      mask.onload = () => {
        ctx.globalCompositeOperation = "source-atop";
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "destination-over";
        ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);

        ctx.globalCompositeOperation = "source-over"; // reset
      };
    };
  }, [baseImage, maskImage, color, width]);

  return <canvas ref={canvasRef} style={{ borderRadius: "10px", width: "100%", maxWidth: width }} />;
};

export default CakePreview;
