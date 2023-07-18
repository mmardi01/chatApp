import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromCookies(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: 'wyaaaaaaaaa rabek hada rah gheer secret',
      });
      request['user'] = payload;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  getTokenFromCookies(req: Request): string | undefined {
    const token = req.cookies.access_token;
    return token;
  }
}
