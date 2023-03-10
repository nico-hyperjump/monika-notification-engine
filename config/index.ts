export default {
  baseURL: process.env.BASE_URL || 'http://localhost',
  publicBaseURL: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost',
  port: process.env.PORT,
  whatsapp: {
    version: process.env.WHATSAPP_API_VERSION || 'v15.0',
    phoneID: process.env.WHATSAPP_API_PHONE_ID || '123123123123123',
    accessToken: process.env.WHATSAPP_API_ACCESS_TOKEN || 'ASDFASDFASDF',
  },
  secretKey: process.env.SECRET_KEY || 's3cret',
  actions: process.env.ACTIONS || 'start,confirmation,instruction',
  action_template:
    process.env.ACTION_TEMPLATE_MAP ||
    'confirmation,monika_confirmation;instruction,monika_yaml_instruction',
  docs:
    process.env.MONIKA_NOTIF_DOC ||
    'https://monika.hyperjumptech.io/docs/notifications',
  monikaHeaderKey: process.env.MONIKA_HEADER_KEY || 'x-monika-header',
  monikaHeader: process.env.MONIKA_HEADER || 'monika-monitoring-header',
  monikaToken: process.env.MONIKA_TOKEN || 'monika-monitoring-token',
};
