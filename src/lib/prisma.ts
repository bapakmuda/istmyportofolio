import { PrismaClient } from "@prisma/client";

import path from 'path';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Detect if running in standalone mode where cwd is .next/standalone
const isStandalone = process.cwd().includes('.next');
const dbPath = isStandalone 
  ? path.join(process.cwd(), '../../prisma/dev.db') 
  : path.join(process.cwd(), 'prisma/dev.db');

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL || `file:${dbPath}`,
      },
    },
  });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
