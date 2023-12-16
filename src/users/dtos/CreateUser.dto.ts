// membuat class dto untuk create user
// Note: DTO sendiri pada dasarnya dalah skema atau gambaran data yg akan kita terima pada bagian request

// gunakan juga class-validator untuk membuat format data lebih konsisten lagi
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(5) // minimal karakter 5
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
