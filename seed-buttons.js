const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.actionButton.count();
  if (count === 0) {
    await prisma.actionButton.createMany({
      data: [
        {
          label: '$ mail -s "Hire Me"',
          url: 'mailto:ryan@example.com',
          order: 0,
        },
        {
          label: '$ wget download --cv',
          url: '#',
          order: 1,
        }
      ]
    });
    console.log('Seeded initial action buttons');
  } else {
    console.log('Action buttons already exist, skipping seed');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
