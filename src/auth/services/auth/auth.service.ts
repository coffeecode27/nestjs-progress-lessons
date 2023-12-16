import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { compareUserPassword } from 'src/utils/bcrypt';
// didalam authService ini kita akan berinteraksi dengan module user
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  // method validate user akan dijalankan, dan akan memanggil method dari userService
  // dan method validateuser ini nantinya akan dipanggil pada bagian localStrategy
  async validateUser(username: string, password: string) {
    // memanggil method findUserByUserName dari user service
    const userDb = await this.userService.findUserByUserName(username);
    // melakukan logic pengecekan validasi untuk user
    if (userDb) {
      // memanggil fungsi compareUserPassword dari bcrypt
      const matchPassword = compareUserPassword(password, userDb.password);
      if (matchPassword) {
        console.log('user validation success!');
        return userDb;
      } else {
        console.log('Password do not match');
        return null;
      }
    } else {
      console.log('user validation failed!');
      return null;
    }
  }
}
