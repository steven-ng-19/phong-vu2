import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AUTH_ERRORS } from 'src/content/errors';
import { AuthGuard } from '@nestjs/passport';
import { JsonWebTokenError } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { USER_JWT_ACCESS_STRATEGY } from '../strategies';

@Injectable()
export class UserJwtAccessAuthGuard extends AuthGuard(
  USER_JWT_ACCESS_STRATEGY,
) {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }

    if (err || !user) {
      throw err || new UnauthorizedException(AUTH_ERRORS.INVALID_TOKEN);
    }
    return super.handleRequest(err, user, info, context);
  }
}
