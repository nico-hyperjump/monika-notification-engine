import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../../config';
import { actions, isActionAllowed } from '../../../services/internal/actions';
import {
  AppError,
  commonHTTPErrors,
  handleErrors,
} from '../../../services/internal/app-error';
import {
  isValidMockRequestWithPredicate,
  responseByMockRequest,
} from '../../../services/internal/monika-handler';
import { getUserByPhoneHash } from '../../../services/repositories/users';
import { getWebhookByToken } from '../../../services/repositories/webhook_token';
import { sendMessageTemplate } from '../../../services/whatsapp/sendMessageTemplate';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ message: `${req.method} method are not allowed!` });

  try {
    const token = req.query.token as string;
    const type = req.query.type as actions;
    if (validateMockRequest(req)) {
      return responseByMockRequest(res);
    }
    const webhook = await getWebhookByToken(token);
    if (!webhook) {
      throw new AppError(commonHTTPErrors.badRequest, 'Invalid token.', true);
    }

    const user = await getUserByPhoneHash(webhook.user);
    if (!user) {
      throw new AppError(
        commonHTTPErrors.notAuthenticated,
        'Unauthorized request.',
        true
      );
    }

    const phone = user.phoneHash;
    const time = new Date().toUTCString();
    const probe_url = 'http://www.example.com';
    const ip_address = '127.0.0.1';
    const host =
      '127.0.0.1 (local), 129.111.33.135 (public) My-Computer.local (hostname)';

    switch (type) {
      case actions.start:
      case actions.terminate: {
        await sendMessageTemplate({
          phone,
          action: type,
          params: [ip_address],
        });
        break;
      }

      case actions.incident:
      case actions.recovery: {
        const message =
          type === actions.incident
            ? 'Status is 400, was expecting 200.'
            : 'Service is ok. Status now 200';
        await sendMessageTemplate({
          phone,
          action: type,
          params: [message, probe_url, time, host],
        });
        break;
      }

      case actions.status_update: {
        const numberOfProbes = '5';
        const averageResponseTime = '659';
        const numberOfIncidents = '40';
        const numberOfRecoveries = '36';
        const numberOfSentNotifications = '80';

        await sendMessageTemplate({
          phone,
          action: type,
          params: [
            time,
            host,
            numberOfProbes,
            averageResponseTime,
            numberOfIncidents,
            numberOfRecoveries,
            numberOfSentNotifications,
          ],
        });
        break;
      }

      default:
        throw new AppError(commonHTTPErrors.badRequest, 'Bad request.', true);
    }

    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return handleErrors(error, res);
  }
};

const validateMockRequest = (req: NextApiRequest): boolean => {
  const type = req.query.type as string;
  const token = req.query.token?.toString();

  return isValidMockRequestWithPredicate(req, () => {
    if (
      token !== config.monikaToken ||
      actions[type] === undefined ||
      !isActionAllowed(type)
    ) {
      throw new AppError(
        commonHTTPErrors.badRequest,
        'Invalid action/token ',
        true
      );
    }
    return true;
  });
};

export default handler;
