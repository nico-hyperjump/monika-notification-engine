/**********************************************************************************
 *                                                                                *
 *    Copyright (C) 2021  SYMON Contributors                                      *
 *                                                                                *
 *   This program is free software: you can redistribute it and/or modify         *
 *   it under the terms of the GNU Affero General Public License as published     *
 *   by the Free Software Foundation, either version 3 of the License, or         *
 *   (at your option) any later version.                                          *
 *                                                                                *
 *   This program is distributed in the hope that it will be useful,              *
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of               *
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                *
 *   GNU Affero General Public License for more details.                          *
 *                                                                                *
 *   You should have received a copy of the GNU Affero General Public License     *
 *   along with this program.  If not, see <https://www.gnu.org/licenses/>.       *
 *                                                                                *
 **********************************************************************************/

import { NextApiResponse } from 'next';
import logger from './logger';

export enum commonHTTPErrors {
  badRequest = 400,
  notAuthenticated = 401,
  forbidden = 403,
  notFound = 404,
  conflict = 409,
  unprocessableEntity = 422,
  tooEarly = 425,
  serverError = 500,
}

export class AppError extends Error {
  public readonly httpErrorCode: commonHTTPErrors;
  public readonly isCustomError: boolean;

  constructor(
    httpErrorCode: number,
    description: string,
    isCustomError: boolean
  ) {
    super(description);

    // restore prototype chain
    Object.setPrototypeOf(this, new.target.prototype);

    this.httpErrorCode = httpErrorCode;
    this.isCustomError = isCustomError;

    Error.captureStackTrace(this);
  }
}

export const handleErrors = (error: any, res: NextApiResponse) => {
  logger.error(error.stack);
  if (!error.isCustomError) {
    return res.status(500).json({ message: 'Oops something went wrong!' });
  }

  return res.status(error.httpErrorCode).json({ message: error.message });
};
