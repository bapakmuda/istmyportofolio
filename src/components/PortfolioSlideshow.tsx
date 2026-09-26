"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type ProjectRecord = { id: string; title: string; description: string; image: string | null; hashtags: string; createdAt: Date };

export default function PortfolioSlideshow({ dbProjects = [] }: { dbProjects?: ProjectRecord[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState<ProjectRecord | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % dbProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + dbProjects.length) % dbProjects.length);
  };

  if (!dbProjects || dbProjects.length === 0) {
    return (
      <div className="w-full text-zinc-500 italic p-6 border border-zinc-800 bg-[#050505]">
        No projects found. Add them via /kamar-belakang
      </div>
    );
  }

  const currentProject = dbProjects[currentIndex];

  return (
    <div className="w-full flex flex-col font-mono">
      {/* Slideshow container */}
      <div className="flex flex-col lg:flex-row gap-6 border border-zinc-800 p-4 lg:p-6 bg-black/40 backdrop-blur-sm rounded">
        
        {/* Left: Image area */}
        <div className="w-full lg:w-1/2 relative aspect-video sm:aspect-[4/3] lg:aspect-auto min-h-[250px] border border-zinc-800 rounded overflow-hidden group cursor-pointer" onClick={() => setZoomedImage(currentProject)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image 
                src={currentProject.image || "/fallback-image.jpg"} 
                alt={currentProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                priority
              />
              {/* Scanline overlay for aesthetic */}
              <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI1NSwgNjUsIDAuMSkiLz4KPC9zdmc+')] opacity-30" />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                <span className="border border-[var(--color-terminal-green)] bg-black/80 px-3 py-1 text-[var(--color-terminal-green)] text-xs uppercase tracking-widest backdrop-blur-sm">
                  [ CLICK TO ENLARGE ]
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Decorative HUD corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[var(--color-terminal-green)] z-10" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[var(--color-terminal-green)] z-10" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[var(--color-terminal-green)] z-10" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[var(--color-terminal-green)] z-10" />
        </div>

        {/* Right: Description area */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-4">
              <span className="text-xs text-[var(--color-text-muted)]">
                FILE {currentIndex + 1} OF {dbProjects.length}
              </span>
              <span className="text-xs text-[var(--color-terminal-green)] flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--color-terminal-green)] animate-pulse rounded-full" />
                ACTIVE
              </span>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProject.id + "-info"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 tracking-tight font-sans">
                  {currentProject.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentProject.hashtags.split(" ").filter(t => t.trim() !== "").map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-zinc-900 border border-zinc-700 text-[var(--color-text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {currentProject.description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex gap-4 pt-4 border-t border-zinc-800">
            <button 
              onClick={prevSlide}
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-[var(--color-terminal-green)] hover:text-[var(--color-terminal-green)] transition-colors"
            >
              {"< PREV"}
            </button>
            <button 
              onClick={nextSlide}
              className="px-4 py-2 bg-zinc-900 border border-zinc-700 hover:border-[var(--color-terminal-green)] hover:text-[var(--color-terminal-green)] transition-colors ml-auto"
            >
              {"NEXT >"}
            </button>
          </div>
        </div>

      </div>
      
      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {dbProjects.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 transition-all ${idx === currentIndex ? "bg-[var(--color-terminal-green)] shadow-[0_0_8px_var(--color-terminal-green)]" : "bg-zinc-700"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Lightbox / Modal for Zoomed Image */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[4/3] sm:aspect-video border border-[var(--color-terminal-green)] shadow-[0_0_30px_rgba(0,255,65,0.15)] rounded bg-black flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center border-b border-zinc-800 px-4 py-2 bg-zinc-900/50 font-mono text-xs">
                <span className="text-[var(--color-terminal-green)] tracking-widest uppercase">
                  {zoomedImage.title}
                </span>
                <button 
                  onClick={() => setZoomedImage(null)}
                  className="text-[var(--color-text-muted)] hover:text-red-500 transition-colors"
                >
                  [ CLOSE ]
                </button>
              </div>
              
              {/* Modal Image */}
              <div className="relative flex-grow w-full bg-[var(--color-bg-primary)]">
                <Image 
                  src={zoomedImage.image || "/fallback-image.jpg"}
                  alt={zoomedImage.title}
                  fill
                  className="object-contain p-2"
                  sizes="100vw"
                  quality={100}
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI1NSwgNjUsIDAuMSkiLz4KPC9zdmc+')] opacity-20" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
