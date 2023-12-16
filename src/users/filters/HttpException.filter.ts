// Saat kita membuat custom exception, sebenarnya kita masih menggunakan 'cara' dari nestjs untuk
// menghandle error atau exception
// mungkin saja kita tidak puas dengan cara nestJs menghandlenya, dan benar-benar ingin membuat strukturnya
// secara manual, maka dari itu, kita bisa menggunakan interface dari ExceptionFilter

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException) // Decorator that marks a class as a Nest exception filter.
export class HttpExceptionFilter implements ExceptionFilter {
  // catch adalah method dari interface ExceptionFilter yg harus kita implement
  // lalu terdapat 2 parameter, yaitu exception dan host
  // ArgumentsHost adalah type yang mana diantara valuenya berupa objek request dan object response
  // dan membuat kita bisa mengaksesnya, dengan cara menggunakan context eksekusi (switchToHttp)
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception.getResponse());
    console.log(exception.getStatus());
    console.log(exception);

    const context = host.switchToHttp();
    const req = context.getRequest<Request>();
    const res = context.getResponse<Response>();

    res.send({
      status: exception.getStatus(),
      message: exception.getResponse(),
    });
  }
}
