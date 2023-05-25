import { NextApiRequest, NextApiResponse } from 'next';
import { handleErrors } from '../../services/internal/app-error';
import {
  isValidMockRequestWithToken,
  responseByMockRequest,
} from '../../services/internal/monika-handler';
import { validateActivationToken } from '../../services/internal/validation';
import { saveUser } from '../../services/repositories/users';
import { saveWebhookToken } from '../../services/repositories/webhook_token';
import { sendInstructionMessage } from '../../services/whatsapp';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ message: `${req.method} method are not allowed!` });

  try {
    if (isValidMockRequestWithToken(req)) return responseByMockRequest(res);
    const token = req.query.token as string;
    const reg = await validateActivationToken(token);

    const user = await saveUser(reg);
    const webhook = await saveWebhookToken('Initial token', user.phoneHash);

    await sendInstructionMessage({
      phone: reg.phoneHash,
      webhookToken: webhook.token,
    });

    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return handleErrors(error, res);
  }
};

export default handler;
