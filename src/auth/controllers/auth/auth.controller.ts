import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
// import { AuthGuard } from '@nestjs/passport';
import {
  AuthenticatedUserGuard,
  LocalAuthGuard,
} from 'src/auth/utils/LocalGuard';

// pada controller auth, kita membuat route untuk login user
// pada controller inilah kita menerapkan authentikasi yg sudah kita buat(menggunakan local strategy)

@Controller('auth')
export class AuthController {
  // pada saat ada request ke route ini, prosesnya akan dihandle oleh guard(localStrategy terlebih dahulu)
  @UseGuards(LocalAuthGuard) // type dari authgurad adalah 'local'
  @Post('login')
  async authLogin() {}

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    console.log(session.id);
    session.authenticated = true;
    return session;
  }
  // jadi hanya user yg dihasilkan dari proses deserialize saja yg akan ditampilkan (valid login)
  // jika tidak ada, maka dianggap tidak ada session alias tidak login
  // jadi statusnya akan unauthorized
  @UseGuards(AuthenticatedUserGuard) // type dari authgurad adalah 'local'
  @Get('status')
  async getStatus(@Req() req: Request) {
    return req.user;
  }
}
