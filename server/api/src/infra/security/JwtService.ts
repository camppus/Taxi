// src/shared/auth/jwt.service.ts
import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET!;

  sign(payload: any, expiresIn: any = "1h") {
    if (!this.accessSecret) {
      throw new Error("JWT_ACCESS_SECRET is missing");
    }
    return jwt.sign(payload, this.accessSecret, {
      expiresIn,
    });
  }

  verify<T = any>(token: string): T {
    return jwt.verify(token, this.accessSecret) as T;
  }
  decode<T = any>(token: string): T | null {
    const decoded = jwt.decode(token);
    if (!decoded || typeof decoded !== "object") {
      return null;
    }

    return decoded as T;
  }
}
