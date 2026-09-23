import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { UAParser } from "ua-parser-js";

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "Unknown IP";
    const userAgent = req.headers.get("user-agent") || "";
    
    const parser = new UAParser(userAgent);
    const os = parser.getOS().name || "Unknown OS";
    const browser = parser.getBrowser().name || "Unknown Browser";
    const deviceType = parser.getDevice().type === "mobile" ? "Mobile" : parser.getDevice().type === "tablet" ? "Tablet" : "Desktop";
    const device = `${deviceType} - ${os} (${browser})`;

    // Fetch location based on IP (In development, this might just return localhost info or fail gracefully)
    let location = "Unknown Location";
    if (ip && ip !== "Unknown IP" && ip !== "::1" && ip !== "127.0.0.1") {
      try {
        const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,city,country`);
        const geoData = await geoRes.json();
        if (geoData.status === "success") {
          location = `${geoData.city}, ${geoData.country}`;
        }
      } catch (e) {
        console.error("GeoIP lookup failed", e);
      }
    } else {
      location = "Localhost";
    }

    await prisma.visitor.create({
      data: {
        ip,
        device,
        location,
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking error", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
