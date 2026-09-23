const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const history = [
    { year: "200X", title: "Started in IT", description: "" },
    { year: "Phase 2", title: "System / Infrastructure", description: "" },
    { year: "Phase 3", title: "Development & DevOps", description: "" },
    { year: "Today", title: "IT Professional", description: "" },
  ];
  for (const h of history) {
    await prisma.history.create({ data: h });
  }
  console.log("Seeded history!");
}
main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
