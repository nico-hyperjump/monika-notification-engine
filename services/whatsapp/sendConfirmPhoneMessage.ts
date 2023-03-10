import cfg from '../../config';
import { sendMessageTemplate } from './sendMessageTemplate';
import { actions } from '../internal/actions';

type ConfirmPhoneInput = {
  name: string;
  phone: string;
  activationToken: string;
  expiredAt: string;
};

export const sendConfirmPhoneMessage = async (input: ConfirmPhoneInput) => {
  const { name, activationToken, phone, expiredAt } = input;
  const activationLink = `${cfg.baseURL}/confirm/${activationToken}`;
  const params = [name, activationLink, expiredAt];

  await sendMessageTemplate({
    phone,
    action: actions.confirm,
    params,
  });
};
