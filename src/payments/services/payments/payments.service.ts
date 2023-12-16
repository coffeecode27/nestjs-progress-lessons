import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePaymentDTO } from '../../dto/CreatePayment.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'example1@gmail.com',
    },
    {
      email: 'example2@gmail.com',
    },
    {
      email: 'example3@gmail.com',
    },
  ];
  async createPayment(dataPayment: CreatePaymentDTO) {
    const { email } = dataPayment;
    const user = this.users.find((user) => user.email === email);
    if (user) {
      return {
        status: 'success',
      };
    } else {
      throw new BadRequestException();
    }
  }
}
