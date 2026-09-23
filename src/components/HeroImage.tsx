"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Generate a dense block of random binary/hex for the text clip effect
const generateCode = () => {
  const chars = "010101010100101010111010111010010101010"; // Pure binary style
  let result = "";
  // Generate a massive string of 4000 characters to guarantee it fills the box
  for (let i = 0; i < 4000; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
};

type SocialRecord = { id: string; platform: string; url: string; icon: string; createdAt: Date };

export default function HeroImage({ dbSocials = [] }: { dbSocials?: SocialRecord[] }) {
  const [codeText, setCodeText] = useState("");

  useEffect(() => {
    setCodeText(generateCode());
    // Periodically scramble the code to make it look like "running text"
    const interval = setInterval(() => {
      setCodeText(generateCode());
    }, 150); // Scramble every 150ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full md:w-1/3 max-w-[280px] mx-auto md:mx-0 flex-shrink-0 relative group">
      <div className="absolute -inset-2 border border-zinc-800 group-hover:border-[var(--color-terminal-green)] transition-colors duration-500 rounded z-0" />
      <div className="absolute -inset-1 border border-zinc-800/50 group-hover:border-[var(--color-terminal-green-dim)] transition-colors duration-500 rounded z-0" />
      
      <div className="relative aspect-square w-full rounded overflow-hidden bg-black z-10 border border-zinc-700">
        
        {/* State 1: Green Binary Code running text */}
        <motion.div 
          className="absolute inset-0 font-mono text-[8px] leading-[0.8] tracking-tighter break-all select-none overflow-hidden text-justify text-[var(--color-terminal-green)] opacity-80"
          style={{
            filter: "drop-shadow(0 0 2px rgba(0,255,65,0.5))"
          }}
          animate={{
            opacity: [1, 1, 0, 0, 0, 1]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.3, 0.4, 0.8, 0.9, 1]
          }}
        >
          {codeText}
        </motion.div>

        {/* State 2: Real Photo fades in, then fades back to code */}
        <motion.div
          className="absolute inset-0 origin-center"
          animate={{
            opacity: [0, 0, 1, 1, 0, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.3, 0.4, 0.8, 0.9, 1]
          }}
        >
          {/* Scanline effect over image */}
          <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI1NSwgNjUsIDAuMSkiLz4KPC9zdmc+')] opacity-30 z-20 mix-blend-overlay" />
          
          <Image 
            src="/itsme.png"
            alt="Ryan"
            fill
            className="object-cover object-center grayscale"
            sizes="(max-width: 768px) 280px, 33vw"
            priority
          />
        </motion.div>
        
        {/* HUD corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-terminal-green)] z-30" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--color-terminal-green)] z-30" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--color-terminal-green)] z-30" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-terminal-green)] z-30" />
      </div>
      
      <div className="mt-3 flex justify-between items-center text-[10px] text-[var(--color-text-muted)] font-mono tracking-widest border-b border-zinc-800 pb-1">
        <span>IT'S ME</span>
        <span className="text-[var(--color-terminal-green)] font-bold drop-shadow-[0_0_4px_rgba(0,255,65,0.4)] animate-pulse">[ ACTIVE ]</span>
      </div>

      <div className="relative z-10 flex flex-wrap gap-4 justify-center w-full px-2 mt-4">
        {dbSocials.map((social) => (
          <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-[var(--color-terminal-green)] transition-all hover:scale-110 transform flex items-center justify-center border border-zinc-800 hover:border-[var(--color-terminal-green)] hover:bg-[var(--color-terminal-green-dim)] rounded p-2 bg-[#050505]" aria-label={social.platform}>
            <i className={`${social.icon} text-lg`}></i>
          </a>
        ))}
      </div>
    </div>
  );
}
