import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { createAddressDto } from './createAddress.dto';
import { Type } from 'class-transformer';

// pada DTO, kita bisa melakukan validasi untuk POST request
// dan untuk menggunakan validasi yg telah kita buat, kita bisa menggunakan "@UsePipes(ValidationPipe)"
// pada bagian contollernya
export class createCustomerDto {
  @IsNumberString() //  contoh melakukan validasi, misalnya untuk field id (harus type number)
  id: number;

  @IsEmail() // contoh untuk melakukan validasi, misalnya untuk field email (harus format email)
  email: string;

  @IsNotEmpty() //  contoh melakukan validasi, misalnya untuk field name (tidak boleh kosong)
  name: string;

  // berikut adalah contoh dari penerapan validasi untuk nested field / properties
  // misalnya kita memiliki field 'address', dan address merupakan field dengan bentuk objek
  @ValidateNested() // digunakan untuk validasi nested object / nested properties
  @Type(() => createAddressDto) // menentukan tipe dari properties
  @IsNotEmptyObject() // untuk pengecekan bahwa object (properties) tidak boleh kosong
  address: createAddressDto;
}
