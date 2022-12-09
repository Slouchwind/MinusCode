declare class MinusCode {
    /**Encode string **consisting of numbers**  
     * 
     * ---
     * 
     * Explame: 
     * ```js
     * import { num_encode } from 'minus-code';
     * console.log(num_encode('01234565432'));
     * ```
     * ---
     * 
     * *Prototype method*
     */
    num_encode: (code: string) => string;

    /**Decode string **consisting of numbers**  
     * 
     * ---
     * 
     * Explame: 
     * ```js
     * import { num_decode } from 'minus-code';
     * console.log(num_decode('159B724A385'));
     * ```
     * ---
     * 
     * *Prototype method*
     */
    num_decode: (code: string) => string;

    /**Encode string */
    encode: (code: string) => string;

    /**Decode string */
    decode: (code: string) => string;
}

export default MinusCode;