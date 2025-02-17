import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class IsAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = GqlExecutionContext.create(context);
      const request = ctx.getContext().req;
      console.log(request.headers, 'headers');
      console.log(request.headers?.authorization, 'Authorization Header');
      const token = this.getTokenFromHeader(request.headers);
      console.log(token, 'token');

      if (!token) throw new BadRequestException('wrong token is provided');

      const payLoad = await this.jwtService.verify(token);
      request.userId = payLoad.userId;

      return true;
    } catch (error) {
      throw new UnauthorizedException('permition denied');
    }
  }
  getTokenFromHeader(headers) {
    const authorization = headers['authorization'];
    if (!authorization) return null;
    const [type, token] = authorization.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
