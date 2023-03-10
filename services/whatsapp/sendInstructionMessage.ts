import cfg from '../../config';
import { actions } from '../internal/actions';
import { sendMessageTemplate } from './sendMessageTemplate';

type sendInstructionMessageInput = {
  phone: string;
  webhookToken: string;
};

export const sendInstructionMessage = async (
  input: sendInstructionMessageInput
) => {
  const { phone, webhookToken } = input;
  const notifyWebhook = `${cfg.baseURL}/api/notify?token=${webhookToken}`;
  const deleteWebhook = `${cfg.baseURL}/delete/${webhookToken}`;
  const params = [notifyWebhook, notifyWebhook, cfg.docs, deleteWebhook];

  await sendMessageTemplate({
    phone,
    action: actions.instruction,
    params,
  });
};
