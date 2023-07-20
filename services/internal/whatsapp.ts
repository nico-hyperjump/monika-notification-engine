import { AppError, commonHTTPErrors } from './app-error';
import axios, { AxiosError, AxiosResponse } from 'axios';
import cfg from '../../config';
import { WhatsappResponse } from '../whatsapp/interfaces';
import logger from './logger';

const AxiosInstance = axios.create({
  baseURL: `https://graph.facebook.com/${cfg.whatsapp.version}`,
  timeout: 20_000, // 20 seconds,
  timeoutErrorMessage: 'Connection timed out',
});

export const sendWhatsappMessageTemplate = async (
  template: string,
  param: string[],
  to: string
): Promise<AxiosResponse<WhatsappResponse>> => {
  try {
    return await AxiosInstance.post(
      `/${cfg.whatsapp.phoneID}/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: template,
          language: {
            code: 'en',
          },
          components: [
            {
              type: 'body',
              parameters: param.map((param) => {
                return {
                  type: 'text',
                  text: param,
                };
              }),
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${cfg.whatsapp.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    ).catch((e: AxiosError) => {
      if (e.code === 'ECONNABORTED' && e.message.includes('timeout')) {
        logger.error('Request timed out');
      } else {
        logger.error(e.message);
      }

      return { ...e.response };
    });
  } catch (error) {
    logger.error(
      `Cannot send WhatsApp message, got: ${JSON.stringify(
        error?.response?.data || error
      )}`
    );
    throw new AppError(
      commonHTTPErrors.serverError,
      error?.response?.data?.message,
      true
    );
  }
};
