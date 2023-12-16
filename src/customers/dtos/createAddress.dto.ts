import { IsNotEmpty, IsNumberString } from 'class-validator';

// Dto untuk address yg nantinya bisa kita gunakan untuk dto pada field address dalam dtoCustomers
export class createAddressDto {
  @IsNotEmpty()
  line1: string;

  line2?: string; // optional (bisa kosong atau tidak diisi)

  @IsNotEmpty()
  city: string;

  @IsNotEmpty()
  state: string;

  @IsNotEmpty()
  @IsNumberString()
  postalCode: number;
}
