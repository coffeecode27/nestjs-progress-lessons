// Contoh jika kita ingin membuat middleware lainnya (lebih dari satu)
// pada middleware ini kita ingin mengecek akun dari customer, apakah valid atau tidak

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class validateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { valid_account } = req.headers;
    console.log('validate Customer Account middleware');
    console.log(valid_account);
    if (valid_account) {
      next();
    } else {
      return res.status(401).send({ Error: 'Invalid Customer Account' });
    }
  }
}
