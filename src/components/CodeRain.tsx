"use client";

import { useEffect, useRef } from "react";

export default function CodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const characters = "0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101".split("");
    const words = ["0x7F4A", "> sudo mount /identity", "ACCESS_GRANTED", "SYSTEM_ONLINE", "root@ryan:~$"];

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let x = 0; x < columns; x++) {
      drops[x] = Math.random() * -100; // start at random positions above screen
    }

    const draw = () => {
      // Create trailing effect by drawing semi-transparent background
      // This fades the old characters
      ctx.fillStyle = "rgba(5, 5, 5, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Randomly decide whether to drop a single character or a full word
        let text = characters[Math.floor(Math.random() * characters.length)];
        let isWord = false;
        
        if (Math.random() > 0.995) {
          text = words[Math.floor(Math.random() * words.length)];
          isWord = true;
        }

        // Set text style (brighter for the 'head' of the drop, overall opacity 15-20% max)
        ctx.fillStyle = "rgba(0, 255, 65, 0.15)";
        
        // Draw the text
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly when it goes off screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        // Move faster if it's a word so it doesn't get cut off weirdly by the next frame, 
        // but for classic matrix rain we just move down by 1.
        drops[i]++;
      }
    };

    // Movement speed
    const interval = setInterval(draw, 50);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
