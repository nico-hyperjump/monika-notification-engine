import { NextApiRequest, NextApiResponse } from 'next';
import getRawBody from 'raw-body';
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
  const signatureFromReq = req.headers['x-hub-signature'];
  if (!signatureFromReq) {
    logger.error('No X-Hub-Signature headers provided');
    return res
      .status(403)
      .json({ message: 'No X-Hub-Signature headers provided' });
  }

  // Generate an X Hub Signature using the app secret from the process env
  // https://github.com/ilkovich/express-x-hub/blob/master/lib/signature.js
  const length = req.headers['content-length'];
  const bodyBuffer = await getRawBody(req, {
    length,
    limit: '100kb',
    encoding: 'utf-8',
  });
  const hmac = createHmac('sha1', process.env.APP_SECRET);
  hmac.update(bodyBuffer);
  const expectedSignature = `sha1=${hmac.digest('hex')}`;

  // Check if signature is valid
  if (expectedSignature !== signatureFromReq) {
    logger.error('Signature does not match');
    return res.status(403).json({ message: 'Signature does not match' });
  }

  // If valid, parse the raw body to JSON
  // https://github.com/ilkovich/express-x-hub/blob/master/lib/jparse.js
  const options = { strict: true };
  const first = bodyBuffer.trim()[0];
  if (bodyBuffer.length === 0) {
    throw new Error('Body is empty');
  }
  if (options.strict && first !== '{' && first !== '[') {
    throw new Error('Not a valid JSON body');
  }

  let body: string;
  try {
    body = JSON.parse(bodyBuffer);
  } catch (e) {
    throw new Error('Unable to parse JSON body');
  }

  // If valid, log the body and save it to DB
  logger.info(`Facebook request body: ${JSON.stringify(body)}`);
  await saveWebhookLog({
    logs: body,
  });

  return res.status(200).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
