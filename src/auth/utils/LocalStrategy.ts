// File local strategy ini berfungsi untuk mengatur logic dari strategi autentikasi (untuk user)
// dalam configurasinya, kita melakukan extend dari fungsi PassportStrategy nestjs yg sudah kita install
// fungsi PassportStrategy sendiri akan menerima parameter class Strategy dari passport-local
// yg sudah kita install

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    // pada bagian super contructor, kita bisa menuliskan opsi untuk field mana yg akan kita tampilkan
    // sebagai respon, karna pada class Strategy, settingnya sudah diatur didalam constructornya
    // jadi class LocalStrategy sebagai isntance, bisa menuliskan setting untuk option field tersebut
    super({
      // usernameField: 'email', // misalnya kita ingin menggunakan field email daripada username itu sendiri
    });
  }

  async validate(username: string, password: string) {
    console.log('inside LocalStrategy');
    // pada bagian localStrategy, kita melakukan proses dari hasil yg direturn oleh authService
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user);
    return user;
  }
}
