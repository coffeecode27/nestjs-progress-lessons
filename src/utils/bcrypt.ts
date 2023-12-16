import * as bcrypt from 'bcrypt'; // import bcrypt

// membuat fungsi hashing password menggunakan bcrypt
export function encodeUserPassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync(); // mengahsilkan string random dengan 10 kali putaran
  return bcrypt.hashSync(rawPassword, salt);
}

// membuat fungsi untuk melakukan komparasi antara rawPassword dan hashPassword (yg sudah tersimpan di DB)
// ketika user melakukan request untuk login
// yang nantinya fungsi ini akan di panggil pada localStrategy untuk cek validasi
export function compareUserPassword(rawPassword: string, hashPassword: string) {
  return bcrypt.compareSync(rawPassword, hashPassword);
}
