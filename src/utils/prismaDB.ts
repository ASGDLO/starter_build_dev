import { PrismaClient } from "@prisma/client";

// Add PrismaClient to the global type in development
declare global {
  // Ensure this doesn't conflict with the default global object
  var prisma: PrismaClient | undefined;
}

// Use PrismaClient in a global context to prevent multiple instances in development
const prisma = global.prisma || new PrismaClient({ log: ["query"] });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export { prisma };
