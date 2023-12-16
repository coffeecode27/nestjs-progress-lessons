import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { User } from './typeorm/User';
import { SessionEntity } from './typeorm/Session';
import { PaymentsModule } from './payments/payments.module';

// app module adalah root module pada aplikasi nestjs
// maka dari itu, kita lebih baik memisahkan module untuk fitur yg akan kita buat
// lalu setelah semua module fitur tersebut dibuat, baru kita import kedalam root module (app module)

@Module({
  // import module dari fitur yg kita buat
  // dan bisa juga untuk import module nestJs yg sudah kita install, contohnya modul typeOrm
  // dan configurasinya (seperti nama datbase, port, entities, dll)
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'belajar_nestjs',
      entities: [User, SessionEntity], // add ur entities here, biatch
      synchronize: true,
    }),
    AuthModule,
    // melakukan import untuk module passport agar bisa digunakan
    PassportModule.register({
      session: true,
    }),
    PaymentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
