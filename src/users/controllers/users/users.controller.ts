import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedUserGuard } from 'src/auth/utils/LocalGuard';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserNotFoundException } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types';

@Controller('users')
export class UsersController {
  constructor(
    // inject userService here
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}

  @UseGuards(AuthenticatedUserGuard)
  @UseInterceptors(ClassSerializerInterceptor) // interceptor to find Serializer class
  @Get('')
  getAllUsers() {
    return this.userService.getAllusers();
  }

  @UseInterceptors(ClassSerializerInterceptor) // interceptor to find Serializer class
  @Get('/username/:username')
  getUserByUsername(@Param('username') username: string) {
    const user = this.userService.getUserByUsername(username);
    if (user) {
      return new SerializedUser(user); // membuat instance dari class SerializedUser
    } else {
      return new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor) // interceptor to find Serializer class
  @UseFilters(HttpExceptionFilter) // untuk menggunakan exception filter yg telah kita buat
  @Get('/id/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUserById(id);
    if (user) {
      return new SerializedUser(user);
    } else {
      // kita bisa memanggil atau membuat instance dari custom exception class yg telah kita buat
      throw new UserNotFoundException('User Was Not Found', 400);
    }
  }

  // Membuat post request (untuk mengisi data kedalam database yg sudah kita buat)
  @Post('create')
  @UsePipes(ValidationPipe) // tuntuk validate data request agar sesuai dengan struktur Dto
  createUser(@Body() dataUser: CreateUserDto) {
    return this.userService.createUser(dataUser);
  }
}
