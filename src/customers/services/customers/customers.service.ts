import { Injectable } from '@nestjs/common';
import { createCustomerDto } from 'src/customers/dtos/createCustomer.dto';
import { Customer } from 'src/customers/types/Customer';

@Injectable()
export class CustomersService {
  // tanda '[]' artinya kita ingin membuat array dari properti object Customer
  private customers: Customer[] = [
    {
      id: 1,
      name: 'T.Imam Suranda',
      email: 'imasuranda@yahoo.com',
    },
    {
      id: 2,
      name: 'Agus hidayatullah',
      email: 'agus@yahoo.com',
    },
  ];

  getAllCustomers() {
    return this.customers;
  }

  getCustomerById(id: number) {
    return this.customers.find((customer) => customer.id === id);
  }

  createCustomer(dataCustomer: createCustomerDto) {
    return this.customers.push(dataCustomer);
  }
}
