"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("ACCESS DENIED: Invalid credentials.");
    } else {
      router.push("/kamar-belakang");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-terminal-green)] font-mono flex items-center justify-center p-4">
      <div className="max-w-md w-full border border-[var(--color-terminal-green)] p-8 shadow-[0_0_15px_rgba(0,255,65,0.1)] bg-[#050505]">
        <h1 className="text-2xl font-bold tracking-widest mb-6 text-center">SYSTEM LOGIN</h1>
        
        {error && (
          <div className="mb-4 p-3 border border-red-500 text-red-500 bg-red-500/10 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[var(--color-terminal-green)]">USERNAME</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent border border-zinc-700 p-3 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]"
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-bold text-[var(--color-terminal-green)]">PASSWORD</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border border-zinc-700 p-3 text-white font-bold focus:outline-none focus:border-[var(--color-terminal-green)]"
            />
          </div>
          <button 
            type="submit"
            className="mt-4 px-6 py-4 bg-[var(--color-terminal-green)] text-black font-bold tracking-widest text-lg hover:bg-[var(--color-terminal-green-dim)] transition-colors"
          >
            [ AUTHENTICATE ]
          </button>
        </form>
      </div>
    </div>
  );
}
