import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createCustomerDto } from 'src/customers/dtos/createCustomer.dto';
import { CustomersService } from 'src/customers/services/customers/customers.service';

// controller hanya bertugas untuk menghandle route, termasuk request dan response
// akan tetapi, semua bisnis logic dari response itu berada di (file) services
@Controller('customers')
export class CustomersController {
  constructor(private customersService: CustomersService) {}
  @Get(':id')
  // handle route GET (request dan response) masih menggunakan expressJs
  getCustomer(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request, // expressJs way
    @Res() res: Response, // expressJs way
  ) {
    const customer = this.customersService.getCustomerById(id);
    console.log(customer);
    if (customer) {
      res.send(customer);
    } else {
      res.status(400).send({ msg: 'Customer not found' });
    }
  }

  // handle route GET (request dan response) sudah menggunakan cara nestJs
  @Get('search/:id')
  searchCustomerById(@Param('id', ParseIntPipe) id: number) {
    const customer = this.customersService.getCustomerById(id);
    if (customer) {
      return customer;
    } else {
      throw new HttpException('Customer Not Found', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('')
  getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  // Contoh membuat route untuk POST request
  @Post('create')
  @UsePipes(ValidationPipe) // menggunakan validasi dari class DTO yg telah kita buat
  createCustomer(@Body() dataCustomer: createCustomerDto) {
    return this.customersService.createCustomer(dataCustomer);
  }
}
