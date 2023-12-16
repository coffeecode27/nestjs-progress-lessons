/*  - Middleware, sama seperti pada expressjs, middleware adalah function yg dieksekusi sebelum proses
      sampai ke route handler untuk memproses response.
    - tapi, agak berbeda dengan expressJs, pada nestjs kita membuat middleware secara terpisah
    - dan menerapkan 'implement' dari NestMiddleware interface
    - dan juga kita harus mengimplementasikan semua abstact function (bawaan dari interface NestMiddleware)
    - lalu melakukan registrasi dan configure middleware pada module (misalnya module customer)
*/

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable() // middleware juga bersifat injectable (bisa di inject ke file yg membutuhkan)
export class validateCustomerMiddleware implements NestMiddleware {
  // use() adalah function bawaan dari interface NestMiddleware yg harus kita implementasikan
  // struktur parameter didalam function use() sama seperti pada expressJs
  // ada request, response, dan next function
  use(req: Request, res: Response, next: NextFunction) {
    // misalnya kita ingin melakukan pengecekan authorization pada header request
    const { authorization } = req.headers;
    console.log('Validate Customer Middleware');
    if (!authorization) {
      return res.status(403).send({ Error: 'No authentiction provided' });
    }

    if (authorization === '123') {
      next(); // panggil next function untuk menjalankan middleware selanjutnya (jika ada)
    } else {
      return res.status(403).send({ Error: 'Wrong authentiction key' });
    }
  }
}
