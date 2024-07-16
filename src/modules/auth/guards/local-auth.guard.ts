import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { LOCAL_STRATEGY } from '../strategies';

export class LocalAuthGuard extends AuthGuard(LOCAL_STRATEGY) {}
