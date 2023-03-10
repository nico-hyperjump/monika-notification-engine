export interface MonikaNotificationMessageInput {
  phone: string;
  probe_url?: string;
  probe_name?: string;
  monika_id?: string;
  ip_address: string;
  response_time?: number;
  status_code?: number;
}

interface WhatsappResponseMessageID {
  id: string;
}

export interface WhatsappResponse {
  meta: {
    api_status: string;
    version: string;
  };
  messages: WhatsappResponseMessageID[];
}

export interface SuccessDataObject {
  to: string;
  msgId: string;
  status: string;
}
