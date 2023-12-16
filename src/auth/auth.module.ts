import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UsersService } from 'src/users/services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { LocalStrategy } from './utils/LocalStrategy';
import { SessionSerializer } from './utils/SessionSerializer';

@Module({
  // karna pada userService kita sudah melakukan InjectRepository untuk entities
  // maka kita juga harus meng-import typeOrm pada module auth, agar kita bisa menggunakan userService
  // pada module auth
  // dan juga kita melakukan import untuk module passport agar bisa digunakan
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      // import userService disini agar dapat digunakan untuk berinteraksi dengan module auth
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    // import localStrategy agar dapat digunakan atau inject
    LocalStrategy,
    // import SessionSerializer agar dapat digunakan atau inject
    SessionSerializer,
  ],
})
export class AuthModule {}
