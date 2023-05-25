import { NextApiRequest, NextApiResponse } from 'next';
import {
  saveRegistration,
  updateRegistration,
} from '../../services/repositories/registrations';
import { sendConfirmPhoneMessage } from '../../services/whatsapp';
import { v4 as uuidv4 } from 'uuid';
import {
  hasTriedToRegister,
  isPhoneAlreadyRegistered,
} from '../../services/internal/validation';
import { handleErrors } from '../../services/internal/app-error';
import {
  isValidMockRequest,
  responseByMockRequest,
} from '../../services/internal/monika-handler';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST')
    return res
      .status(400)
      .json({ message: `${req.method} method are not allowed!` });

  const { phone, name } = req.body;
  try {
    if (isValidMockRequest(req)) return responseByMockRequest(res);
    await isPhoneAlreadyRegistered(phone);
    let registration = await hasTriedToRegister(phone);

    // set expiration date
    const activationToken = uuidv4();
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    const newExpireDate = new Date(now);

    if (!registration) {
      registration = await saveRegistration({
        phoneHash: phone,
        name,
        token: activationToken,
        expiredAt: newExpireDate,
      });
    } else {
      registration.token = activationToken;
      registration.expiredAt = newExpireDate;
      await updateRegistration(registration);
    }

    await sendConfirmPhoneMessage({
      name,
      phone,
      activationToken: registration.token,
      expiredAt: registration.expiredAt
        .toISOString()
        .replace(/T/, ' ')
        .replace(/\..+/, ''),
    });

    return res.status(200).json({ message: 'SUCCESS' });
  } catch (error) {
    return handleErrors(error, res);
  }
};

export default handler;
