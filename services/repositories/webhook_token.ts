import prisma from '../internal/db';
import logger from '../internal/logger';

export const saveWebhookToken = async (name: string, user: string) => {
  try {
    return prisma.webhook_token.create({
      data: {
        name,
        user,
      },
    });
  } catch (error) {
    logger.error(`Error on save webhook token: ${error}`);
    throw error;
  }
};

export const getWebhookByToken = async (token: string) => {
  try {
    return prisma.webhook_token.findUnique({
      where: {
        token,
      },
    });
  } catch (error) {
    logger.error(`Error on get webhook token: ${error}`);
    throw error;
  }
};

export const getWebhookByUser = async (user: string) => {
  try {
    return prisma.webhook_token.findFirst({
      where: {
        user,
      },
    });
  } catch (error) {
    logger.error(`Error on get webhook token by user: ${error}`);
    throw error;
  }
};

export const updateResendToken = async (token: string) => {
  try {
    return prisma.webhook_token.update({
      data: {
        resendAt: new Date(Date.now() + 3600 * 1000 * 24),
      },
      where: {
        token,
      },
    });
  } catch (error) {
    logger.error(`Error on update resend token: ${error}`);
  }
};

export const deleteWebhookByToken = async (token: string) => {
  try {
    return prisma.webhook_token.delete({
      where: {
        token,
      },
    });
  } catch (error) {
    logger.error(`Error on deleting webhook token: ${error}`);
    throw error;
  }
};
