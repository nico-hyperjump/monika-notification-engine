import { NextApiRequest, NextApiResponse } from 'next';
import { actions, isActionAllowed } from '../../services/internal/actions';
import {
  AppError,
  commonHTTPErrors,
  handleErrors,
} from '../../services/internal/app-error';
import {
  isValidMockRequestWithToken,
  responseByMockRequest,
} from '../../services/internal/monika-handler';
import { getUserByPhoneHash } from '../../services/repositories/users';
import { getWebhookByToken } from '../../services/repositories/webhook_token';
import { sendMessageTemplate } from '../../services/whatsapp';

type NotifyRequestBody =
  | {
      type: actions.start | actions.terminate;
      ip_address: string;
    }
  | {
      type: actions.incident | actions.recovery;
      alert: string;
      url: string;
      time: string;
      monika: string;
    }
  | {
      type: actions.status_update;
      time: string;
      monika: string;
      numberOfProbes: number;
      averageResponseTime: number;
      numberOfIncidents: number;
      numberOfRecoveries: number;
      numberOfSentNotifications: number;
    };

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ message: `${req.method} method are not allowed!` });

  try {
    if (isValidMockRequestWithToken(req)) return responseByMockRequest(res);
    const token = req.query.token as string;
    const data: NotifyRequestBody = req.body;
    if (!isActionAllowed(data.type)) {
      throw new AppError(commonHTTPErrors.badRequest, 'Bad request.', true);
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

    switch (data.type) {
      case actions.start:
      case actions.terminate: {
        await sendMessageTemplate({
          phone,
          action: data.type,
          params: [data.ip_address],
        });
        break;
      }

      case actions.incident:
      case actions.recovery: {
        await sendMessageTemplate({
          phone,
          action: data.type,
          params: [data.alert, data.url, data.time, data.monika],
        });
        break;
      }

      case actions.status_update: {
        sendMessageTemplate({
          phone,
          action: data.type,
          params: [
            data.time,
            data.monika,
            String(data.numberOfProbes),
            String(data.averageResponseTime),
            String(data.numberOfIncidents),
            String(data.numberOfRecoveries),
            String(data.numberOfSentNotifications),
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

export default handler;
