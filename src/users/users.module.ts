import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';

@Module({
  // saat kita sudah bkerja dengan database, khususnya typeOrm
  // jangan lupa untuk melakukan import module orm dan entitis-nya pada module yg ingin kita gunakan
  // misalnya, pada saat ini kita ingin menggunakan orm dan entities repository didalam module user
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
