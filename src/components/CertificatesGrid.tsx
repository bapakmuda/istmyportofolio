"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type CertificateRecord = { id: string; name: string; image: string | null; createdAt: Date };

export default function CertificatesGrid({ dbCertificates = [] }: { dbCertificates?: CertificateRecord[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [zoomedImage, setZoomedImage] = useState<{ src: string, title: string } | null>(null);

  const slideLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const slideRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="w-full font-mono flex flex-col relative">
        {/* Navigation Controls */}
        <div className="flex justify-between items-end mb-4">
          <span className="text-xs text-[var(--color-text-muted)]">
            TOTAL: {dbCertificates.length} RECORDS FOUND
          </span>
          <div className="flex gap-2">
            <button 
              onClick={slideLeft}
              className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-700 hover:border-[var(--color-terminal-green)] hover:text-[var(--color-terminal-green)] transition-colors"
            >
              {"<"}
            </button>
            <button 
              onClick={slideRight}
              className="w-10 h-10 flex items-center justify-center bg-zinc-900 border border-zinc-700 hover:border-[var(--color-terminal-green)] hover:text-[var(--color-terminal-green)] transition-colors"
            >
              {">"}
            </button>
          </div>
        </div>

        {/* Slider Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {dbCertificates.length === 0 && (
            <div className="w-full text-zinc-500 italic p-6 border border-zinc-800 bg-[#050505]">
              No certificates found. Add them via /kamar-belakang
            </div>
          )}
          {dbCertificates.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="min-w-[280px] w-[280px] sm:min-w-[350px] sm:w-[350px] snap-center group relative border border-zinc-800 bg-zinc-950/50 rounded-lg overflow-hidden flex flex-col hover:border-[var(--color-terminal-green)] transition-colors duration-300 flex-shrink-0"
            >
              {/* Image Container / Placeholder */}
              <div 
                className={`relative aspect-[4/3] w-full border-b border-zinc-800 group-hover:border-[var(--color-terminal-green)] transition-colors duration-300 bg-[var(--color-bg-secondary)] flex flex-col items-center justify-center p-6 text-center overflow-hidden ${cert.image ? 'cursor-zoom-in' : ''}`}
                onClick={() => cert.image ? setZoomedImage({ src: cert.image, title: cert.name }) : null}
              >
                
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI1NSwgNjUsIDAuMSkiLz4KPC9zdmc+')] opacity-20 z-10" />
                
                {cert.image ? (
                  <>
                    <Image 
                      src={cert.image} 
                      alt={cert.name} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-20">
                      <span className="border border-[var(--color-terminal-green)] bg-black/80 px-3 py-1 text-[var(--color-terminal-green)] text-xs uppercase tracking-widest backdrop-blur-sm">
                        [ CLICK TO ENLARGE ]
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Holographic glowing emblem placeholder */}
                    <div className="w-16 h-16 rounded-full border border-[var(--color-terminal-green-dim)] flex items-center justify-center mb-4 relative z-0 group-hover:shadow-[0_0_15px_rgba(0,255,65,0.3)] transition-all">
                      <div className="w-10 h-10 border border-[var(--color-terminal-green)] rotate-45 group-hover:rotate-90 transition-transform duration-700" />
                    </div>
                    <span className="text-[var(--color-terminal-green-dim)] text-xs uppercase tracking-widest relative z-0 group-hover:text-[var(--color-terminal-green)] transition-colors">
                      [ VERIFIED CREDENTIAL ]
                    </span>
                  </>
                )}
              </div>

              {/* Certificate Details */}
              <div className="p-5 flex-grow flex flex-col justify-between bg-black/40">
                <div>
                  <h4 className="text-lg font-bold text-[var(--color-text-primary)] font-sans mb-1 leading-tight group-hover:text-[var(--color-terminal-green)] transition-colors line-clamp-2">
                    {cert.name}
                  </h4>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-800/50 flex justify-between items-center text-xs">
                  <span className="text-[var(--color-terminal-green-dim)]">ID: {cert.id.substring(0,6)}</span>
                  <span className="bg-zinc-900 border border-zinc-700 px-2 py-1 text-[var(--color-text-secondary)]">
                    {new Date(cert.createdAt).getFullYear()}
                  </span>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-[var(--color-terminal-green)] transition-colors" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-[var(--color-terminal-green)] transition-colors" />
            </motion.div>
          ))}
        </div>
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
                  src={zoomedImage.src}
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
    </>
  );
}
