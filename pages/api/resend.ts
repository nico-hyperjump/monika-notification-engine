import { NextApiRequest, NextApiResponse } from 'next';
import {
  AppError,
  commonHTTPErrors,
  handleErrors,
} from '../../services/internal/app-error';
import {
  isValidMockRequest,
  responseByMockRequest,
} from '../../services/internal/monika-handler';
import {
  getWebhookByUser,
  updateResendToken,
} from '../../services/repositories/webhook_token';
import { sendInstructionMessage } from '../../services/whatsapp';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ message: `${req.method} method are not allowed!` });

  try {
    if (isValidMockRequest(req)) return responseByMockRequest(res);
    const { phone } = req.body;
    const webhook = await getWebhookByUser(phone);
    if (!webhook) {
      throw new AppError(commonHTTPErrors.notFound, 'Token not found.', true);
    }

    if (webhook.resendAt >= new Date()) {
      throw new AppError(
        commonHTTPErrors.tooEarly,
        `You're requesting too soon. Try again after ${webhook.resendAt.toLocaleDateString(
          undefined,
          {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        )} ${webhook.resendAt.toLocaleTimeString()}.`,
        true
      );
    }

    await sendInstructionMessage({
      phone,
      webhookToken: webhook.token,
    });

    await updateResendToken(webhook.token);

    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return handleErrors(error, res);
  }
};

export default handler;
