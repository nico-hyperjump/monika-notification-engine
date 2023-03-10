import pino from 'pino';

const pinoConfig = {
  browser: {
    asObject: true,
  },
  prettyPrint: {
    colorize: true,
    singleLine: true,
  },
};

const logger = pino(pinoConfig);

export const log = (msg: any) => logger.info(msg);
export default logger;
