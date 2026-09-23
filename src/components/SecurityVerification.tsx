"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import ScrambleText from "./ScrambleText";

export default function SecurityVerification({ onVerified }: { onVerified: () => void }) {
  useEffect(() => {
    // Automatically proceed after the scramble effect finishes (2.5 seconds)
    const timer = setTimeout(() => {
      onVerified();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onVerified]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen flex flex-col justify-center items-center text-[var(--color-text-primary)] font-mono absolute inset-0 z-50 bg-[var(--color-bg-primary)]"
    >
      <div className="text-center">
        <p className="text-[var(--color-text-secondary)] text-sm mb-4 tracking-widest">
          SYSTEM_ACCESS //
        </p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-[0.2em] text-[var(--color-terminal-green)] drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">
          <ScrambleText text="RYAN FIRDYAWAN" delay={200} />
        </h1>
        <div className="mt-8">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-[2px] bg-[var(--color-terminal-green)] mx-auto max-w-[200px]"
          />
        </div>
      </div>
    </motion.div>
  );
}
