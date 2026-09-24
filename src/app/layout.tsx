import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RYAN PORT",
  description: "Personal portfolio and digital identity of Ryan, an IT professional focused on infrastructure, DevOps, systems, technology and digital projects.",
  keywords: ["IT Professional", "DevOps", "IT Infrastructure", "System Administrator", "Solution Architect", "Project Manager", "Linux", "Laravel", "Technology", "IT Portfolio"],
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

import CodeRain from "@/components/CodeRain";

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <Providers>
          <CodeRain />
          {children}
        </Providers>
      </body>
    </html>
  );
}
