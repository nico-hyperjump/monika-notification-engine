import { NextApiRequest, NextApiResponse } from 'next';
import {
  AppError,
  commonHTTPErrors,
} from './../../services/internal/app-error';
import {
  getUserByPhoneHash,
  deleteUserByPhoneHash,
} from './../../services/repositories/users';
import { handleErrors } from '../../services/internal/app-error';
import {
  getWebhookByToken,
  deleteWebhookByToken,
} from '../../services/repositories/webhook_token';
import { deleteRegistration } from '../../services/repositories/registrations';
import {
  isValidMockRequestWithToken,
  responseByMockRequest,
} from '../../services/internal/monika-handler';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE')
    return res
      .status(400)
      .json({ message: `${req.method} method are not allowed!` });

  try {
    const token = req.query.token as string;
    if (isValidMockRequestWithToken(req)) return responseByMockRequest(res);
    const webhook = await getWebhookByToken(token);
    if (!webhook) {
      throw new AppError(commonHTTPErrors.badRequest, 'Invalid token.', true);
    }

    const user = await getUserByPhoneHash(webhook.user);
    if (!user) {
      throw new AppError(
        commonHTTPErrors.notAuthenticated,
        'User not found.',
        true
      );
    }

    const { phoneHash } = user;

    await deleteUserByPhoneHash(phoneHash);
    await deleteWebhookByToken(token);
    await deleteRegistration(phoneHash);

    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return handleErrors(error, res);
  }
};
