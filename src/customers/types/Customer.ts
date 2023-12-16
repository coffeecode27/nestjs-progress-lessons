// Membuat custom type
// dengan cara membuat interface yg nantinya dapat kita implement pada class atau objek yg membutuhkannya
// class atau objek yg meng-implement interfacenya nantinya akan memiliki type interface ini
export interface Customer {
  id: number;
  name: string;
  email: string;
}
