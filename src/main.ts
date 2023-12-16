import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'; // import session express
import * as passport from 'passport';
import { TypeormStore } from 'connect-typeorm';
import { DataSource } from 'typeorm';
import { SessionEntity } from './typeorm/Session';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const sessionRepository = app.get(DataSource).getRepository(SessionEntity);
  app.setGlobalPrefix('api');
  app.use(
    session({
      // register session kedalam applikasi, dan mealakukan konfigurasi
      name: 'NESTJS_SESSION_ID',
      // pada bagian secret ini bertanggung jawab sebagai key ketika kita melakukan encrypt session
      secret: 'wkwkwk',
      // pada bagian resave ini bertanggung jawab apakah kita ingin melakukan save ulang untuk session yg sama
      resave: false,
      // pada bagian saveUninitialide ini bertanggung jawab apakah kita ingin inisialisai session
      // untuk user yg bahkan tidak melakukan login
      // jika kita memberikan nilai true, maka session akan di inisialisai,
      // namun sebelum masa expired berakhir, session yg sama akan terus di provide setiap kali request
      saveUninitialized: false,
      cookie: {
        maxAge: 60000, // batas expired untuk satu cookie atau session
      },
      // jadi, store akan dihubungkan kedalam typeorm, dan akan dibuatkan tabel juga nantinya
      // untuk menyimpan data session dari user
      store: new TypeormStore().connect(sessionRepository),
    }),
  );
  // mendaftarkan dan menggunakan middleware passport.initialize dan passport.session
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();
