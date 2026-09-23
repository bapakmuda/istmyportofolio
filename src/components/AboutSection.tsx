import Image from "next/image";

export default function AboutSection() {
  return (
    <div className="font-mono text-sm leading-relaxed text-[var(--color-text-secondary)] bg-transparent p-6 border border-zinc-800 rounded">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Side: Text Content */}
        <div className="flex-1 space-y-6 w-full">
          <div>
            <h1 className="text-4xl font-bold text-[var(--color-text-primary)] font-sans tracking-tight mb-2">Ryan</h1>
            <div className="inline-block bg-transparent border border-zinc-700 px-3 py-1 text-[var(--color-terminal-green)] font-mono text-xs rounded-sm">
              IT Professional // 15+ Years
            </div>
          </div>
          
          <p className="text-lg text-[var(--color-text-primary)] font-bold">
            Systems. DevOps. Linux. Code. Infrastructure.
          </p>
          
          <p>
            15+ years of breaking things, fixing things, building systems, and turning ideas into working technology.
          </p>
          
          <p>
            From <strong className="text-[var(--color-text-primary)]">servers to software, infrastructure to architecture</strong> — always curious, always experimenting, always building.
          </p>
          
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row gap-4">
            <div className="bg-[var(--color-terminal-green-dim)] border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] px-3 py-1 inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-terminal-green)] animate-pulse"></span>
              STATUS: ONLINE
            </div>
            <div className="bg-transparent border border-zinc-700 text-[var(--color-text-secondary)] px-3 py-1 inline-flex items-center gap-2">
              MODE: STILL_LEARNING
            </div>
          </div>
        </div>

        {/* Right Side: Profile Image */}
        <div className="w-full md:w-1/3 max-w-[250px] mx-auto md:mx-0 flex-shrink-0 relative group">
          {/* Decorative frame/border for the image */}
          <div className="absolute -inset-2 border border-zinc-800 group-hover:border-[var(--color-terminal-green)] transition-colors duration-500 rounded z-0" />
          <div className="absolute -inset-1 border border-zinc-800/50 group-hover:border-[var(--color-terminal-green-dim)] transition-colors duration-500 rounded z-0" />
          
          {/* Image container */}
          <div className="relative aspect-square w-full rounded overflow-hidden bg-black z-10 border border-zinc-700">
            {/* Scanline effect over image */}
            <div className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsIDI1NSwgNjUsIDAuMSkiLz4KPC9zdmc+')] opacity-30 z-20" />
            
            <Image 
              src="/itsme.png"
              alt="Ryan - Profile Picture"
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-90 group-hover:opacity-100"
              sizes="(max-width: 768px) 250px, 33vw"
              priority
            />
            
            {/* Corner HUD accents */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[var(--color-terminal-green)] opacity-0 group-hover:opacity-100 transition-opacity z-30" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[var(--color-terminal-green)] opacity-0 group-hover:opacity-100 transition-opacity z-30" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[var(--color-terminal-green)] opacity-0 group-hover:opacity-100 transition-opacity z-30" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[var(--color-terminal-green)] opacity-0 group-hover:opacity-100 transition-opacity z-30" />
          </div>
          
          {/* Under-image tech label */}
          <div className="mt-3 flex justify-between items-center text-[10px] text-[var(--color-text-muted)] font-mono tracking-widest border-b border-zinc-800 pb-1">
            <span>ID_IMG_R_01</span>
            <span className="text-[var(--color-terminal-green-dim)]">[ AUTHORIZED ]</span>
          </div>
        </div>
      </div>
    </div>
  );
}
