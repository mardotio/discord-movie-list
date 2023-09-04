import { PrismaClient } from '@prisma/client';
import { isProduction } from './environment';

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prismaClient =
  globalForPrisma.prisma || new PrismaClient()

if (isProduction) {
  globalForPrisma.prisma = prismaClient
}

export default prismaClient;

