// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import prismaClient from '../../services/internal/db';
import { commonHTTPErrors } from '../../services/internal/app-error';

const handler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    const [{ now: result }]: { now: Date }[] =
      await prismaClient.$queryRaw`SELECT NOW()`;
    if (!result) {
      return res.status(commonHTTPErrors.serverError).json({
        data: false,
        message: 'Cannot connect to the DB',
        timestamp: new Date().toISOString(),
      });
    }
    return res
      .status(200)
      .json({ data: true, message: 'Service is healthy', timestamp: result });
  } catch (e) {
    return res.status(commonHTTPErrors.serverError).json({
      data: false,
      message: e.message,
      timestamp: new Date().toISOString(),
    });
  }
};

export default handler;
