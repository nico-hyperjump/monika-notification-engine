import prisma from '../internal/db';
import logger from '../internal/logger';

type TWebhookLogBody = {
  logs: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const saveWebhookLog = async (data: TWebhookLogBody) => {
  try {
    return prisma.webhook_logs.create({
      data,
    });
  } catch (error) {
    logger.error(`Error on save webhook token: ${error}`);
    throw error;
  }
};
