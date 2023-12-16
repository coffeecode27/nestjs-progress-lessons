import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controller/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { validateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { validateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService], // injectable file akan berada dalam providers
})
// Melalukan configurasi dan register middleware
// kita harus implement interface NestModule, agar bisa menggunakan configure() untuk konfigurasi middleware
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // register atau apply middleware (bisa lebih dari satu middleware)
      // dan kita juga bisa melakukan combine class middleware dengan function(misalnya arrow function)
      // note : Midlleware berjalan secara berurutan
      .apply(
        validateCustomerMiddleware,
        validateCustomerAccountMiddleware,
        (req: Request, res: Response, next: NextFunction) => {
          console.log('This is the third middleware');
          next();
        },
      )
      // contoh jika ingin melakukan pengecualian middleware untuk path
      .exclude({
        path: 'customers/search/:id',
        method: RequestMethod.GET,
      })
      // menerapkan middleware untuk spesifik route dalam controller customers (atau bisa semua route)
      .forRoutes(CustomersController);
  }
}
