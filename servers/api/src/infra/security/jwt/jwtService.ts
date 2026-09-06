import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadData {
  sub: string;
  sessionId: string;
}

@Injectable()
export default class JwtService {
  private readonly secret: string;
  private readonly expiresIn = '15m';

  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new InternalServerErrorException('JWT_SECRET is not configured');
    }

    this.secret = secret;
  }

  generate(payload: JwtPayloadData): string {
    return jwt.sign(payload, this.secret, {
      algorithm: 'HS256',
      expiresIn: this.expiresIn,
    });
  }

  verify(token: string): JwtPayloadData {
    try {
      const payload = jwt.verify(token, this.secret, {
        algorithms: ['HS256'],
      });

      if (typeof payload !== 'object' || !payload.sub || !payload.sessionId) {
        throw new UnauthorizedException('Invalid token');
      }

      return {
        sub: payload.sub,
        sessionId: payload.sessionId,
      };
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  decode(token: string): JwtPayload | null {
    const payload = jwt.decode(token);

    if (!payload || typeof payload === 'string') {
      return null;
    }

    return payload;
  }
}
