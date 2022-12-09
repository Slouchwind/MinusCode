import MinusCode from './index.js';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const mcode = new MinusCode();

/*
//Prototype method test

console.log(mcode.num_encode('01234565432'));
console.log(mcode.num_decode('159B724A385'));
*/

//English test
console.log(mcode.encode('Hello World!'));
console.log(mcode.decode('30921101801802110520F7211241180100063'));
console.log();

//汉字测试
console.log(mcode.encode('你好'));
console.log(mcode.decode('52502249920'));
console.log();

console.log(`Look this code at ${__filename}`);