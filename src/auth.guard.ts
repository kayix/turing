import { ExecutionContext, Injectable, HttpException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      // throw err || new UnauthorizedException();
      throw err || new HttpException({ code: 'AUT_02', message: 'The apikey is invalidddddd.', field: 'API-KEdddY' }, 401);
    }
    return user;
  }
}
