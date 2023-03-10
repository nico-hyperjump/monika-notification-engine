import * as crypto from 'crypto';
import cfg from '../../config';

const key = crypto.createHash('sha256').update(cfg.secretKey).digest();
const resizedIV = Buffer.allocUnsafe(16);
const algorithm = 'aes256';

export const hashPhone = (phone: string) => {
  return crypto.createHmac('sha256', cfg.secretKey).update(phone).digest('hex');
};

export interface encodedPhone {
  initializationVector: string;
  content: string;
}

export const encodePhone = (phone: string): encodedPhone => {
  const cipher = crypto.createCipheriv(algorithm, key, resizedIV);
  cipher.update(phone, 'binary', 'hex');
  return {
    initializationVector: resizedIV.toString('hex'),
    content: cipher.final('hex'),
  };
};

export const decodePhone = (encoded: encodedPhone) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(encoded.initializationVector, 'hex')
  );
  decipher.update(encoded.content, 'hex', 'binary');
  return decipher.final('binary');
};
