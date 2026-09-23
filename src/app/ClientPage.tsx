"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

import PortfolioSlideshow from "@/components/PortfolioSlideshow";
import CertificatesGrid from "@/components/CertificatesGrid";
import SkillsSection from "@/components/SkillsSection";
import HeroImage from "@/components/HeroImage";
import SecurityVerification from "@/components/SecurityVerification";
import ScrambleText from "@/components/ScrambleText";

type Skill = { id: string; name: string; icon: string; createdAt: Date };
type HistoryRecord = { id: string; year: string; title: string; description: string | null; createdAt: Date };
type ProjectRecord = { id: string; title: string; description: string; image: string | null; hashtags: string; createdAt: Date };
type CertificateRecord = { id: string; name: string; image: string | null; createdAt: Date };
type SocialRecord = { id: string; platform: string; url: string; icon: string; createdAt: Date };
type ActionButtonRecord = { id: string; label: string; url: string; order: number; createdAt: Date };

export default function ClientPage({ dbSkills, dbHistory, dbProjects, dbCertificates, dbSocials, dbButtons }: { dbSkills: Skill[], dbHistory: HistoryRecord[], dbProjects: ProjectRecord[], dbCertificates: CertificateRecord[], dbSocials: SocialRecord[], dbButtons: ActionButtonRecord[] }) {
  const [appState, setAppState] = useState<"verifying" | "booting" | "ready">("verifying");

  useEffect(() => {
    // Only track once per browser session
    if (!sessionStorage.getItem("tracked_visit")) {
      fetch("/api/track", { method: "POST" })
        .then(() => sessionStorage.setItem("tracked_visit", "true"))
        .catch(console.error);
    }

    // Security measures: Disable right-click and common developer tools shortcuts
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Cmd+Option+I, Cmd+Option+U
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "i" || e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center p-4 sm:p-8 max-w-7xl mx-auto w-full relative z-10">
      <AnimatePresence mode="wait">
        {appState === "verifying" && (
          <SecurityVerification key="verify" onVerified={() => setAppState("booting")} />
        )}
        {appState === "booting" && (
          <BootSequence key="boot" onComplete={() => setAppState("ready")} />
        )}
        {appState === "ready" && (
          <PortfolioContent key="content" dbSkills={dbSkills} dbHistory={dbHistory} dbProjects={dbProjects} dbCertificates={dbCertificates} dbSocials={dbSocials} dbButtons={dbButtons} />
        )}
      </AnimatePresence>
    </main>
  );
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const lines = [
    "PORT-RYAN // SECURE TERMINAL",
    "",
    "[ SYSTEM BOOT SEQUENCE ]",
    "",
    "Initializing kernel.............. OK",
    "Loading network.................. OK",
    "Mounting profile................. OK",
    "Loading identity................. OK",
    "Establishing secure channel...... OK",
    "Loading archive.................. OK",
    "",
    "SYSTEM STATUS: ONLINE",
    "NETWORK STATUS: CONNECTED",
    "ARCHIVE STATUS: READY",
    "ACCESS LEVEL: PUBLIC",
    "",
    "> WELCOME VISITOR",
  ];

  const [visibleLines, setVisibleLines] = useState<number>(0);

  useEffect(() => {
    if (visibleLines < lines.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, visibleLines < 4 ? 200 : visibleLines < 10 ? 100 : 300);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visibleLines, lines.length, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
      className="w-full h-[80vh] flex flex-col justify-center text-[var(--color-terminal-green)] font-mono text-sm sm:text-base"
    >
      <div className="border border-[var(--color-terminal-green-dim)] p-6 bg-[var(--color-bg-secondary)]/50 rounded max-w-2xl mx-auto w-full shadow-[0_0_15px_rgba(0,255,65,0.1)]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className={`min-h-[1.5rem] ${
              line.includes("WELCOME") 
                ? "text-[var(--color-terminal-green)] font-bold drop-shadow-[0_0_4px_rgba(0,255,65,0.4)]" 
                : line.includes("OK") || line.includes("STATUS") || line.includes("LEVEL") || line.includes("Initializing")
                  ? "text-cyan-400 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]"
                  : "text-[var(--color-terminal-green)] opacity-80"
            }`}
          >
            {line.split(/(OK|ONLINE|CONNECTED|READY|PUBLIC)/).map((part, index) => 
              ["OK", "ONLINE", "CONNECTED", "READY", "PUBLIC"].includes(part) ? (
                <span key={index} className="text-[var(--color-terminal-green)] drop-shadow-[0_0_4px_rgba(0,255,65,0.4)] font-bold">{part}</span>
              ) : (
                <span key={index}>{part}</span>
              )
            )}
          </motion.div>
        ))}
        {visibleLines < lines.length && (
          <div className="min-h-[1.5rem]">
            <span className="inline-block w-2 h-4 bg-[var(--color-terminal-green)] animate-blink" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PortfolioContent({ dbSkills, dbHistory, dbProjects, dbCertificates, dbSocials, dbButtons }: { dbSkills: Skill[], dbHistory: HistoryRecord[], dbProjects: ProjectRecord[], dbCertificates: CertificateRecord[], dbSocials: SocialRecord[], dbButtons: ActionButtonRecord[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-full flex flex-col gap-16 pb-20"
    >
      <Navbar />
      <Hero dbSocials={dbSocials} />
      <div className="flex flex-col gap-6">
        <Section title="01 // IDENTITY" command="> whoami" id="about">
          <div className="bg-transparent p-6 border border-zinc-800 rounded font-mono text-sm min-h-[350px]">
            <pre className="text-[var(--color-text-secondary)] whitespace-pre-wrap">
              <TypewriterText text={`{
  "name": "Ryan",
  "role": "IT Professional",
  "experience": "15+ Years",
  "focus": [
    "IT Infrastructure",
    "DevOps",
    "System",
    "Project Management",
    "Development"
  ],
  "interests": [
    "Technology",
    "Leadership",
    "Video Editing",
    "Design",
    "Gaming"
  ]
}`} pause={5000} />
            </pre>
          </div>
        </Section>
      </div>

      <Section title="02 // SKILLS" command="> cat /etc/skills.conf" id="skills">
        <SkillsSection dbSkills={dbSkills} />
      </Section>
      <Section title="03 // PROJECT" command="> ls /projects" id="portfolio">
        <PortfolioSlideshow dbProjects={dbProjects} />
      </Section>
      <Section title="04 // CERTIFICATES" command="> ls /certs" id="certificates">
        <CertificatesGrid dbCertificates={dbCertificates} />
      </Section>
      <Section title="05 // CAREER" command="> history" id="experience">
        <div className="border-l border-zinc-800 ml-4 pl-6 py-2 space-y-6 relative">
          {/* Electricity flow animation over the border */}
          <div className="absolute -left-[1px] top-0 bottom-0 w-[2px] overflow-hidden z-0">
            <motion.div 
              className="absolute left-0 w-full h-32 bg-gradient-to-b from-transparent via-[var(--color-terminal-green)] to-transparent opacity-80"
              style={{ filter: "drop-shadow(0 0 8px rgba(0,255,65,0.8))" }}
              animate={{ top: ["-150px", "100%"] }}
              transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
            />
          </div>

          {dbHistory.length > 0 ? (
            dbHistory.map(item => (
              <TimelineItem key={item.id} year={item.year} title={item.title} description={item.description} />
            ))
          ) : (
            <div className="text-zinc-500 italic text-sm">No career history found. Configure via /kamar-belakang</div>
          )}
        </div>
      </Section>

      <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-2xl mx-auto">
        {dbButtons.length > 0 ? (
          dbButtons.map((btn, index) => (
            <ScrambleButton key={btn.id} href={btn.url} text={btn.label} delay={500 + (index * 300)} />
          ))
        ) : (
          <div className="w-full text-center text-zinc-600 font-mono text-sm py-4 border border-zinc-800 bg-[#050505]">
            No action buttons configured. Configure via /kamar-belakang
          </div>
        )}
      </div>
      <Footer dbSocials={dbSocials} />
    </motion.div>
  );
}

function ScrambleButton({ text, href, delay }: { text: string, href: string, delay: number }) {
  const [trigger, setTrigger] = useState(0);
  return (
    <motion.a
      href={href}
      onHoverStart={() => setTrigger(t => t + 1)}
      whileHover={{ scale: 1.02, backgroundColor: "rgba(0,255,65,0.05)" }}
      whileTap={{ scale: 0.98 }}
      className="px-8 py-4 bg-[#050505] border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] shadow-[0_0_8px_rgba(0,255,65,0.1)] hover:shadow-[0_0_20px_rgba(0,255,65,0.25)] font-mono text-sm tracking-[0.2em] text-center transition-all duration-300 flex-1 rounded-sm"
    >
      <ScrambleText text={text} delay={delay} trigger={trigger} />
    </motion.a>
  );
}

function TypewriterText({ text, speed = 30, pause = 5000 }: { text: string, speed?: number, pause?: number }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let isMounted = true;
    
    const typeText = async () => {
      while (isMounted) {
        setDisplayText(""); // reset
        
        await new Promise(r => setTimeout(r, 800)); // Initial delay before typing
        
        for (let i = 1; i <= text.length; i++) {
          if (!isMounted) break;
          setDisplayText(text.substring(0, i));
          // add tiny random variation to speed for realism
          await new Promise(r => setTimeout(r, speed + (Math.random() * 15)));
        }
        
        if (!isMounted) break;
        // Wait pause duration before clearing and repeating
        await new Promise(r => setTimeout(r, pause));
      }
    };
    
    typeText();
    
    return () => {
      isMounted = false;
    };
  }, [text, speed, pause]);

  return (
    <span>
      {displayText}
      <span className="inline-block w-2 h-4 bg-[var(--color-terminal-green)] animate-blink align-middle ml-1 -mt-1" />
    </span>
  );
}

function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 sm:sticky sm:top-4 bg-[var(--color-bg-primary)]/95 sm:bg-[var(--color-bg-primary)]/90 backdrop-blur border-t sm:border border-zinc-800 p-3 sm:p-4 sm:rounded flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-2 sm:gap-4 text-[10px] sm:text-sm font-mono uppercase shadow-[0_-5px_20px_rgba(0,0,0,0.8)] sm:shadow-none pb-4 sm:pb-4">
      <div className="font-bold text-[var(--color-terminal-green)] tracking-wider hidden sm:block">
        <span className="opacity-50">~/</span>PORT-RYAN
      </div>
      <div 
        className="flex flex-row justify-between sm:justify-center gap-2 sm:gap-6 text-[var(--color-text-secondary)] w-full sm:w-auto px-4 sm:px-0"
      >
        <a href="#about" title="About" className="hover:text-[var(--color-terminal-green)] transition-colors py-2 px-3 sm:py-1.5 sm:px-3 border border-zinc-800 sm:border-transparent rounded sm:rounded-none bg-[#0a0a0a] sm:bg-transparent flex-shrink-0 flex items-center justify-center">
          <span className="sm:hidden"><i className="fa-solid fa-user text-lg"></i></span>
          <span className="hidden sm:inline">[01] ABOUT</span>
        </a>
        <a href="#skills" title="Skills" className="hover:text-[var(--color-terminal-green)] transition-colors py-2 px-3 sm:py-1.5 sm:px-3 border border-zinc-800 sm:border-transparent rounded sm:rounded-none bg-[#0a0a0a] sm:bg-transparent flex-shrink-0 flex items-center justify-center">
          <span className="sm:hidden"><i className="fa-solid fa-terminal text-lg"></i></span>
          <span className="hidden sm:inline">[02] SKILLS</span>
        </a>
        <a href="#portfolio" title="Projects" className="hover:text-[var(--color-terminal-green)] transition-colors py-2 px-3 sm:py-1.5 sm:px-3 border border-zinc-800 sm:border-transparent rounded sm:rounded-none bg-[#0a0a0a] sm:bg-transparent flex-shrink-0 flex items-center justify-center">
          <span className="sm:hidden"><i className="fa-solid fa-folder-open text-lg"></i></span>
          <span className="hidden sm:inline">[03] PROJECT</span>
        </a>
        <a href="#certificates" title="Certificates" className="hover:text-[var(--color-terminal-green)] transition-colors py-2 px-3 sm:py-1.5 sm:px-3 border border-zinc-800 sm:border-transparent rounded sm:rounded-none bg-[#0a0a0a] sm:bg-transparent flex-shrink-0 flex items-center justify-center">
          <span className="sm:hidden"><i className="fa-solid fa-certificate text-lg"></i></span>
          <span className="hidden sm:inline">[04] CERTS</span>
        </a>
        <a href="#experience" title="Career" className="hover:text-[var(--color-terminal-green)] transition-colors py-2 px-3 sm:py-1.5 sm:px-3 border border-zinc-800 sm:border-transparent rounded sm:rounded-none bg-[#0a0a0a] sm:bg-transparent flex-shrink-0 flex items-center justify-center">
          <span className="sm:hidden"><i className="fa-solid fa-briefcase text-lg"></i></span>
          <span className="hidden sm:inline">[05] CAREER</span>
        </a>
        <a href="#contact" title="Contact" className="hover:text-[var(--color-terminal-green)] transition-colors py-2 px-3 sm:py-1.5 sm:px-3 border border-zinc-800 sm:border-transparent rounded sm:rounded-none bg-[#0a0a0a] sm:bg-transparent flex-shrink-0 flex items-center justify-center">
          <span className="sm:hidden"><i className="fa-solid fa-envelope text-lg"></i></span>
          <span className="hidden sm:inline">[06] CONTACT</span>
        </a>
      </div>
    </nav>
  );
}

function Hero({ dbSocials }: { dbSocials: SocialRecord[] }) {
  return (
    <section className="relative min-h-[50vh] rounded-lg p-[1px] shadow-[0_0_20px_rgba(0,255,65,0.05)] flex flex-col justify-center items-start">
      {/* The rotating gradient, clipped to just the border using a CSS mask */}
      <div
        className="absolute inset-0 z-0 rounded-lg overflow-hidden pointer-events-none"
        style={{
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px"
        }}
      >
        <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,#27272a_0_280deg,var(--color-terminal-green)_360deg)] animate-[spin_4s_linear_infinite]" />
      </div>

      <div className="relative z-10 w-full h-full p-8 sm:p-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col justify-center items-start w-full md:w-2/3">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-5xl sm:text-7xl font-bold tracking-tight mb-6"
          >
            RYAN
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-[var(--color-text-secondary)] font-mono space-y-2 mb-8"
          >
            <p className="text-[var(--color-terminal-green)]">IT PROFESSIONAL</p>
            <p>DEVOPS / SYSTEM / TECHNOLOGY</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg font-mono space-y-1 mb-12"
          >
            <p>I BUILD SYSTEMS.</p>
            <p>I SOLVE PROBLEMS.</p>
            <p>I ENJOY TECHNOLOGY.</p>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 border border-[var(--color-terminal-green)] text-[var(--color-terminal-green)] font-mono hover:bg-[var(--color-terminal-green-dim)] transition-colors"
          >
            [ ENTER SYSTEM ]
          </motion.button>
        </div>

        {/* Right side: Image and Socials */}
        <HeroImage dbSocials={dbSocials} />
      </div>
    </section>
  );
}

function Section({ title, command, children, id }: { title: string, command: string, children: React.ReactNode, id: string }) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="font-mono text-[var(--color-text-secondary)] mb-2 flex items-center gap-2">
        <span className="text-[var(--color-terminal-green)]">root@ryan:~$</span>
        <span className="typing-effect">{command}</span>
      </div>
      <div className="border border-[var(--color-terminal-green)] rounded-lg overflow-hidden shadow-lg shadow-[var(--color-terminal-green-dim)]">
        {/* macOS style header with green background */}
        <div className="bg-[var(--color-terminal-green)] px-4 py-2 flex items-center relative">
          {/* Traffic lights (macOS buttons) */}
          <div className="flex gap-2 absolute left-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
          </div>

          {/* Window Title centered */}
          <div className="w-full text-center text-[10px] sm:text-xs font-mono font-bold text-[#050505] tracking-widest px-14 sm:px-16 truncate">
            {title}
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-transparent overflow-x-auto">
          {children}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ year, title, description }: { year: string, title: string, description?: string | null }) {
  return (
    <div className="relative">
      <div className="absolute -left-[31px] top-1 w-3 h-3 bg-[var(--color-bg-primary)] border border-[var(--color-terminal-green)] rounded-full z-10" />
      <div className="font-mono flex flex-col">
        <span className="text-[var(--color-terminal-green)] text-sm">{year}</span>
        <h3 className="text-lg font-bold mt-1 text-[var(--color-text-primary)]">{title}</h3>
        {description && (
          <p className="mt-2 text-zinc-400 text-sm whitespace-pre-wrap leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}

function Footer({ dbSocials }: { dbSocials: SocialRecord[] }) {
  return (
    <footer id="contact" className="mt-20 border-t border-zinc-800 pt-8 pb-12 font-mono text-xs sm:text-sm text-[var(--color-text-muted)] flex flex-col sm:flex-row justify-between gap-8">
      <div>
        <p className="text-[var(--color-terminal-green)] mb-1">SYSTEM STATUS: ONLINE</p>
        <p>ACCESS LEVEL: PUBLIC</p>
        <br />
        <p>root@ryan:~$ exit</p>
        <p>CONNECTION CLOSED.</p>
      </div>
      
      <div className="flex flex-col sm:items-end justify-between">
        <div className="flex flex-col sm:text-right mb-4">
          <p>IT · DEVOPS · SYSTEM · TECHNOLOGY</p>
          <p>LEADERSHIP · VIDEO EDITING · DESIGN · GAMING</p>
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-4 mb-4 sm:justify-end">
          {dbSocials.map((social) => (
            <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-terminal-green)] transition-colors hover:scale-110 transform" aria-label={social.platform}>
              <i className={`${social.icon} text-xl`}></i>
            </a>
          ))}
          {dbSocials.length === 0 && (
            <span className="text-zinc-600">No socials configured.</span>
          )}
        </div>

        <p className="sm:text-right">© 2026 RYAN</p>
      </div>
    </footer>
  );
}

