import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { User as UserEntity } from 'src/typeorm/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types'; // type(interface untuk user)
import { encodeUserPassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  private users: User[] = [];

  getAllusers() {
    // plainToClass adalah metode yang digunakan untuk mengubah objek user menjadi objek kelas SerializedUser
    // 'SerializedUser', adalah kelas yang digunakan untuk menggambarkan struktur objek hasil serialisasi.
    // 'user', adalah objek yang akan diubah atau diserialisasi ke dalam format yang sesuai dengan kelas 'SerializedUser'
    return this.users.map((user) => plainToClass(SerializedUser, user));
  }

  getUserByUsername(username: string) {
    return this.users.find((user) => user.username === username);
  }

  getUserById(id: number) {
    return this.users.find((user) => user.id === id);
  }

  createUser(dataUser: CreateUserDto) {
    const password = encodeUserPassword(dataUser.password);
    console.log(password);
    // destructuring, dan ganti nilai dalam property password dengan value yg sudah di hash
    const newUser = this.userRepository.create({ ...dataUser, password });
    return this.userRepository.save(newUser);
  }

  // membuat method yg akan digunakan pada module auth
  // sederhananya kita akan membuat login sederhana, dengan mengirim data user
  // lalu pada bagian auth akan melakukan validasi bagiaan password dari user yg ditemukan
  findUserByUserName(username: string) {
    return this.userRepository.findOne({ where: { username: username } });
  }

  getUserAuthById(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }
}
