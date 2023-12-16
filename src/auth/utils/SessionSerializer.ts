// Membuat class serializer dan deserializer untuk user
// kita mengextends class PassportSerializer dari module @nestjs/passport
import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/services/users/users.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {
    super();
  }
  // use abstract method\
  // serializeUser akan didalankan saat user berhasil login
  // lalu mengambil data user untuk mengubah formatnya lalu diletakkan kedalam session
  serializeUser(user: User, done: (error, user: User) => void) {
    console.log('inside serializeUser');
    done(null, user);
  }

  // use abstract method
  // deserializeUser akan dijalankan ketika user yg sudah login melakukan aktivitas
  // misalnya melakukan request, maka method ini akan mengambil data pengguna dari session
  // lalu mengubahnya kedalam bentuk data asli untuk kebutuhan mengidentifikasi user
  async deserializeUser(user: User, done: (error, user: User) => void) {
    console.log('inside deserializeUser');
    const userDb = await this.userService.getUserAuthById(user.id);
    return userDb ? done(null, user) : done(null, null);
  }
}
