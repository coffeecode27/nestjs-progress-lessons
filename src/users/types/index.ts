import { Exclude } from 'class-transformer';

// type atau interface untuk user (bisa digunakan untuk anotasi tipe)
export interface User {
  id: number;
  username: string;
  password: string;
}

// kelas untuk melakukan serialisasi pada user
// misalnya filtering untuk meng-exclude bagian password ketika mereturn data sebagai response
export class SerializedUser {
  username: string;

  @Exclude() // serialisasi untuk mengecualikan password untuk data response
  password: string;

  // constructor ini berperan untuk menerima parameter untuk class atau new instance dari class SerializedUser
  // dan Partial<SerializedUser>, artinya kita bisa mengirimkan sebagian atau seluruh properti yg sesuai
  // pada parent-class nya, yg artinya opsional
  // lalu pada bagian Object.assign(this, partial), artinya kita mengaitkan object this dengan
  // properti dari objek parameter 'partial'
  // yg nantinya akan diterapkan ke child class, atau instance class SerializedUser itu sendiri
  constructor(partial: Partial<SerializedUser>) {
    Object.assign(this, partial);
  }
}
