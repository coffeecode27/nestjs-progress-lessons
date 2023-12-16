import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

// Membuat custom guard untuk mengakses konteks user login
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean; // berisi true atau false
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); // mengecek status logIn dengan parameter berupa data dari object request
    return result; // return true atau false untuk autentikasi user
  }
}

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest<Request>();
    return req.isAuthenticated(); // mengembalikan objek req.isAuthenticated
  }
}
