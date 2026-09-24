import { NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import path from "path";

export async function GET() {
  const logPath = "/tmp/portfolio-error.log";
  
  if (!existsSync(logPath)) {
    return NextResponse.json({ message: "No error log found" });
  }

  try {
    const logs = readFileSync(logPath, "utf-8");
    return new NextResponse(logs, {
      headers: { "Content-Type": "text/plain" }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
