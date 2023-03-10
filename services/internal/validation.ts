import {
  getRegistrationByPhoneHash,
  getRegistrationByToken,
} from '../repositories/registrations';
import { getUserByPhoneHash } from '../repositories/users';
import { AppError, commonHTTPErrors } from './app-error';

export const isAlreadyExpired = (expiredAt: Date) => {
  const now = new Date();
  return expiredAt <= now;
};

export const isPhoneAlreadyRegistered = async (phoneHash: string) => {
  const user = await getUserByPhoneHash(phoneHash);
  if (user) {
    throw new AppError(
      commonHTTPErrors.forbidden,
      'This number is already registered. Would you like to resend the token?',
      true
    );
  }

  return false;
};

export const hasTriedToRegister = async (phoneHash: string) => {
  const registration = await getRegistrationByPhoneHash(phoneHash);

  if (registration && !isAlreadyExpired(registration.expiredAt)) {
    throw new AppError(
      commonHTTPErrors.tooEarly,
      'We have sent a message to this WhatsApp number. Please click the link in that message to confirm.',
      true
    );
  }

  return registration;
};

export const validateActivationToken = async (token: string) => {
  const reg = await getRegistrationByToken(token);
  if (!reg || !reg.phoneHash) {
    throw new AppError(
      commonHTTPErrors.notAuthenticated,
      'Token not found',
      true
    );
  }

  if (isAlreadyExpired(reg.expiredAt)) {
    throw new AppError(
      commonHTTPErrors.notAuthenticated,
      'Token expired',
      true
    );
  }

  return reg;
};
