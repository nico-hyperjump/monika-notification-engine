import { registrations } from '.prisma/client';
import prisma from '../internal/db';
import logger from '../internal/logger';

export const getUserByPhoneHash = async (phoneHash: string) => {
  return prisma.users.findUnique({
    where: {
      phoneHash,
    },
  });
};

export const saveUser = async (reg: registrations) => {
  const { phoneHash, name } = reg;
  return prisma.users.create({
    data: {
      phoneHash,
      name,
    },
  });
};

export const deleteUserByPhoneHash = async (phoneHash: string) => {
  try {
    return prisma.users.delete({
      where: {
        phoneHash,
      },
    });
  } catch (error) {
    logger.error(`Error on deleting user: ${error}`);
    throw error;
  }
};
