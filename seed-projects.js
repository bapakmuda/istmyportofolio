const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const projects = [
    {
      title: "ATTENDANCE SYSTEM",
      image: "/attendance_system.jpg",
      hashtags: "#GPS #Geofencing #Monitoring",
      description: "A location-based attendance system using GPS and geofencing technology, designed to support employee attendance monitoring across multiple locations."
    },
    {
      title: "LUGGAGE TRACKING",
      image: "/luggage_tracking.jpg",
      hashtags: "#Logistics #RFID/Barcode #DataStreams",
      description: "A digital luggage tracking solution designed to replace manual recording and provide a more structured way of monitoring luggage movement in real-time."
    },
    {
      title: "SERVER INFRASTRUCTURE",
      image: "/server_infra.jpg",
      hashtags: "#DevOps #Linux #DataCenter",
      description: "Designing and maintaining internal server environments to support operational systems, applications, databases, and organizational data securely."
    }
  ];
  for (const p of projects) {
    await prisma.project.create({ data: p });
  }
  console.log("Seeded projects!");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
