import { JwtPayload } from 'jsonwebtoken';

export type TokenPayload = {
  id: string;
};

export type JwtVerifyPayload = JwtPayload & TokenPayload;
