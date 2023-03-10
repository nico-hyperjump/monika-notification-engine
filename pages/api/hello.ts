// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { PrismaClient } from '.prisma/client';
import { users } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (_: NextApiRequest, res: NextApiResponse) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(200).json({ message: 'success' });
    return null;
  }
  const userList: users[] = await prisma.users.findMany();
  res.status(200).json(userList);
};
