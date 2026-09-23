"use client";

import { useState, useEffect } from "react";

export default function ScrambleText({ text, delay = 0, trigger = 0 }: { text: string, delay?: number, trigger?: number }) {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; // speed of settling
      }, 50);
    }, delay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, delay, trigger]);

  return <span>{displayText || " "}</span>;
}
