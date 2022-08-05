import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

declare var process: {
  env: {
    JSON_SECRET_KEY: string;
  };
};

interface IPayload {
  sub: string;
}

export async function ensureAuthenticateDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      message: 'Token missing',
    });
  }

  const [, token] = authHeader.split(' ');
  try {
    const { sub } = verify(token, process.env.JSON_SECRET_KEY) as IPayload;
    request.deliveryman_id = sub;
    return next();
  } catch (err) {
    return response.status(401).json({ message: 'Invalid token!' });
  }
}
