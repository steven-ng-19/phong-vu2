import { JwtPayload } from 'jsonwebtoken';

export type TokenPayload = {
  id: string;
};

export type JwtVerifyPayload = JwtPayload & TokenPayload;

export type JwtClerkPayload = {
  exp: number;
  iat: number;
  nbf: number;
  iss: string;
  sub: string;
  sid: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  userName: string;
} & JwtVerifyPayload;
