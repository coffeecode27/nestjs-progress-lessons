// Exception layer, untuk mengahandle error pada nestJs
// Dan saat ini, kita akan membuat custom exception sendiri, untuk menghandle error pada modul user

import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundException extends HttpException {
  // kita melakukan extend ke parent classnya (yaitu class HttpException)
  // lalu membuat constructor dan mengirimkan parameter untuk super classnya (parent constructor)
  // parameter yg dikirim berupa message dan status
  // lalu kita menambahkan optional chaining untuk parameternya, yg artinya bisa diisi bisa tidak
  constructor(msg?: string, status?: HttpStatus) {
    // jika user tidak mengirimkan parameter, gunakan nilai defaultnya
    super(msg || 'User Not Found', status || HttpStatus.BAD_REQUEST);
  }
}
