import { AppError, commonHTTPErrors } from '../internal/app-error';
import { sendWhatsappMessageTemplate } from '../internal/whatsapp';
import { getActionTemplateMap } from '../repositories/wa_templates';

type sendMessageInput = {
  phone: string;
  action: string;
  params: string[];
};

const actionTemplateMap = getActionTemplateMap();

export const sendMessageTemplate = async (input: sendMessageInput) => {
  const { phone, action, params } = input;
  const template = actionTemplateMap.get(input.action);
  if (!template) {
    throw new Error(`Could not find Template for ${action}"`);
  }

  const result = await sendWhatsappMessageTemplate(template, params, phone);
  if (!result.data || !result.data.messages.length) {
    throw new AppError(
      commonHTTPErrors.serverError,
      'Could not send message to Whatsapp',
      true
    );
  }

  return result.data;
};
