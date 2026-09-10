import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

import JwtService from '../../security/jwt/jwtService.js';

export interface CurrentContext {
  userId: string;
  sessionId: string;
  isAdmin: boolean;
}

export type CurrentContextKey = 'userId' | 'sessionId' | 'isAdmin';

export const Current = createParamDecorator(
  (key: CurrentContextKey | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const jwtService = new JwtService();
    const token = extractBearerToken(request);
    if (!token) {
      throw new UnauthorizedException('Access token is required');
    }
    const payload = jwtService.verify(token);

    const currentContext: CurrentContext = {
      userId: payload.sub,
      sessionId: payload.sessionId,
      isAdmin: payload.isAdmin,
    };

    if (!key) {
      return currentContext;
    }
    return currentContext[key];
  },
);

function extractBearerToken(request: any): string | undefined {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return undefined;
  }

  const [type, token] = authorization.split(' ');

  if (type !== 'Bearer' || !token) {
    return undefined;
  }

  return token;
}
