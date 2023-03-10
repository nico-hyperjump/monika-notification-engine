import { NextApiRequest, NextApiResponse } from 'next';
import config from '../../config';
import { AppError, commonHTTPErrors } from './app-error';

const isValidMockRequest = (req: NextApiRequest): boolean => {
  if (
    req.headers[config.monikaHeaderKey] !== undefined &&
    req.headers[config.monikaHeaderKey] !== config.monikaHeader
  ) {
    throw new AppError(commonHTTPErrors.badRequest, 'Invalid header', true);
  }
  return req.headers[config.monikaHeaderKey] === config.monikaHeader;
};

const isValidMockRequestWithPredicate = (
  req: NextApiRequest,
  predicate: () => boolean
): boolean => {
  return isValidMockRequest(req) && predicate();
};

const isValidMockRequestWithToken = (req: NextApiRequest): boolean => {
  return isValidMockRequestWithPredicate(req, () => {
    if (req.query.token !== config.monikaToken) {
      throw new AppError(commonHTTPErrors.badRequest, 'Invalid token', true);
    }
    return true;
  });
};

const responseByMockRequest = (res: NextApiResponse): any => {
  return res.status(200).json({ message: 'success' });
};

export {
  isValidMockRequest,
  isValidMockRequestWithPredicate,
  isValidMockRequestWithToken,
  responseByMockRequest,
};
