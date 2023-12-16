import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

// membuat dto untuk skema data payment
export class CreatePaymentDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
