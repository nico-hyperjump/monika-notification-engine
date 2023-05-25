import { NextApiRequest, NextApiResponse } from 'next';

import { handleErrors } from '../../../services/internal/app-error';
import logger from '../../../services/internal/logger';
import { createHmac } from 'crypto';
import { saveWebhookLog } from '../../../services/repositories/webhook_logs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        return await get(req, res);
      case 'POST':
        return await post(req, res);
      default:
        return res.status(404).json({ message: 'Method not found' });
    }
  } catch (error) {
    return handleErrors(error, res);
  }
};

async function get(req: NextApiRequest, res: NextApiResponse) {
  if (
    req.query['hub.mode'] == 'subscribe' &&
    req.query['hub.verify_token'] == process.env.TOKEN
  ) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send(400);
  }
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  // Check if x-hub-signature header is present
  const signatureFromReq = req.headers['X-Hub-Signature'];
  if (!signatureFromReq) {
    logger.error('No X-Hub-Signature headers provided');
    return res
      .status(403)
      .json({ message: 'No X-Hub-Signature headers provided' });
  }

  // Generate an X Hub Signature using the app secret from the process env
  const hmac = createHmac('sha256', process.env.APP_SECRET);
  hmac.update(req.body, 'utf-8');
  const expectedSignature = `sha256=${hmac.digest('hex')}`;

  // Check if signature is valid
  if (expectedSignature !== signatureFromReq) {
    logger.error('Signature does not match');
    return res.status(403).json({ message: 'Signature does not match' });
  }

  // If valid, log the body and save it to DB
  logger.info(`Facebook request body: ${JSON.stringify(req.body)}`);
  await saveWebhookLog({
    logs: req.body,
  });

  return res.status(200).end();
}
