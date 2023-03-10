import { AppError, commonHTTPErrors } from './app-error';
import axios, { AxiosResponse } from 'axios';
import cfg from '../../config';
import { WhatsappResponse } from '../whatsapp/interfaces';

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
    const response = await AxiosInstance.post(
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
    );

    return response;
  } catch (error) {
    throw new AppError(
      commonHTTPErrors.serverError,
      error.response?.data?.message,
      true
    );
  }
};
