import { num_encode, num_decode } from './index.js';
import { fileURLToPath } from 'node:url';

console.log(num_encode('01234565432'));
console.log(num_decode('159B724A385'));
console.log(`Look this code at ${fileURLToPath(import.meta.url)}`);