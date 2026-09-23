"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/kamar-belakang/login") {
    return <div className="relative z-[60] bg-[#050505] min-h-screen">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-white font-mono flex flex-col md:flex-row relative z-[60] pb-16 md:pb-0">
      {/* Sidebar / Topbar */}
      <aside className="w-full md:w-64 border-b md:border-r md:border-b-0 border-zinc-800 p-4 md:p-6 flex flex-col md:gap-8 h-auto md:h-screen sticky top-0 bg-[#050505] z-50 flex-shrink-0">
        <div className="flex justify-between items-center md:flex-col md:items-start">
          <div>
            <div className="text-[var(--color-terminal-green)] font-bold tracking-widest text-xl md:text-2xl mb-1">
              PORT-RYAN
            </div>
            <div className="text-xs md:text-sm text-zinc-300 font-bold tracking-widest hidden md:block">
              // ADMIN TERMINAL
            </div>
          </div>
        </div>
        
        <nav className="fixed bottom-0 left-0 w-full bg-[#050505] border-t border-zinc-800 p-3 shadow-[0_-5px_20px_rgba(0,0,0,0.8)] md:shadow-none md:p-0 md:border-t-0 md:relative md:bg-transparent md:w-auto z-50 flex flex-row md:flex-col gap-4 md:gap-4 overflow-x-auto font-bold text-sm md:text-lg flex-1 md:flex-none items-center md:items-start whitespace-nowrap [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <Link href="/kamar-belakang/skills" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/skills" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/skills" ? "> SKILLS" : "  SKILLS"}
          </Link>
          <Link href="/kamar-belakang/projects" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/projects" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/projects" ? "> PROJECTS" : "  PROJECTS"}
          </Link>
          <Link href="/kamar-belakang/certificates" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/certificates" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/certificates" ? "> CERTIFICATES" : "  CERTIFICATES"}
          </Link>
          <Link href="/kamar-belakang/history" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/history" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/history" ? "> HISTORY" : "  HISTORY"}
          </Link>
          <Link href="/kamar-belakang/buttons" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/buttons" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/buttons" ? "> BUTTONS" : "  BUTTONS"}
          </Link>
          <Link href="/kamar-belakang/socials" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/socials" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/socials" ? "> SOCIALS" : "  SOCIALS"}
          </Link>
          <Link href="/kamar-belakang/visitors" className={`hover:text-[var(--color-terminal-green)] transition-colors ${pathname === "/kamar-belakang/visitors" ? "text-[var(--color-terminal-green)] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)]" : "text-zinc-300"}`}>
            {pathname === "/kamar-belakang/visitors" ? "> VISITOR STATS" : "  VISITOR STATS"}
          </Link>
          <div className="md:mt-auto flex flex-row md:flex-col gap-4 text-xs md:text-base ml-auto md:ml-0 md:pt-8 items-center md:items-start border-l md:border-l-0 border-zinc-800 pl-4 md:pl-0">
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-left text-zinc-300 font-bold hover:text-red-400 transition-colors whitespace-nowrap"
            >
              [ LOGOUT ]
            </button>
            <Link href="/" className="text-zinc-300 font-bold hover:text-white transition-colors whitespace-nowrap pr-2 md:pr-0">
              [ EXIT ]
            </Link>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
