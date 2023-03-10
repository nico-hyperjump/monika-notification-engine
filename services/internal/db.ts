import { PrismaClient } from '@prisma/client';

const Prisma = new PrismaClient({
  log: ['query', 'info', `warn`, `error`],
  errorFormat: 'pretty',
});

Prisma.$connect();

export default Prisma;
