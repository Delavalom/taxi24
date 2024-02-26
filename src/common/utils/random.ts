const alphabet = 'abcdefghijklmnopqrstuvwxyz';

export class Random {
  randomString(num: number) {
    let str = '';
    for (let i = 0; i < num; i++) {
      str += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return str;
  }
}
