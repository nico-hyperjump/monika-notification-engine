import { registrations } from '.prisma/client';
import prisma from '../internal/db';
import logger from '../internal/logger';

type saveRegistrationInput = {
  phoneHash: string;
  name: string;
  token: string;
  expiredAt: Date;
};

export const saveRegistration = async (input: saveRegistrationInput) => {
  const { phoneHash, name, token, expiredAt } = input;
  try {
    return prisma.registrations.create({
      data: {
        phoneHash,
        name,
        token,
        expiredAt,
      },
    });
  } catch (error) {
    logger.error(`Error on save registration: ${error}`);
  }
};

export const updateRegistration = async (input: registrations) => {
  const { token, expiredAt, phoneHash } = input;
  try {
    return prisma.registrations.update({
      data: {
        token,
        expiredAt,
        updatedAt: new Date(),
      },
      where: {
        phoneHash,
      },
    });
  } catch (error) {
    logger.error(`Error on update registration: ${error}`);
  }
};

export const deleteRegistration = async (phoneHash: string) => {
  try {
    return prisma.registrations.delete({
      where: {
        phoneHash,
      },
    });
  } catch (error) {
    logger.error(`Error on delete registration: ${error}`);
  }
};

export const getRegistrationByPhoneHash = async (phoneHash: string) => {
  return prisma.registrations.findFirst({
    where: {
      phoneHash,
    },
  });
};

export const getRegistrationByToken = async (token: string) => {
  return prisma.registrations.findFirst({
    where: {
      token,
    },
  });
};

export const getAllRegistrations = async () => {
  return prisma.registrations.findMany();
};
