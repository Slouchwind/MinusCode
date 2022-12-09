class MinusCode {
    num_encode(code) {
        if (isNaN(Number(code)) || !code) throw new Error('Fail to encode');
        code = String(code);
        if (code.length === 0 || code.length === 1) return code;
        if (code.length % 2 === 1 && code.length !== 1) code += '=';
        let addedCode = [], minusCode = [];
        for (let i = 0; (i + 2) <= code.length; i += 2) {
            if (code[i + 1] === '=') addedCode.push(Number(code[i]));
            else {
                const NUM = Number(code[i]), NEXT_NUM = Number(code[i + 1]);
                addedCode.push(NUM + NEXT_NUM);
                minusCode.push(NEXT_NUM);
            }
        }
        const minusCodeStr = minusCode.join('');
        return (
            String.fromCharCode(...addedCode.map(n => n + (n >= 10 ? 55 : 48))) +
            this.num_encode(minusCodeStr)
        );
    }

    num_decode(code) {
        if (code.length === 0 || code.length === 1) return code;
        code = String(code);
        let addedCodeStr = code.slice(0, code.length / 2 + 0.5), minusCodeStr = code.slice(addedCodeStr.length - code.length);
        let addedCode = [], minusCode = [];
        for (let i in addedCodeStr) {
            const n = addedCodeStr.charCodeAt(i);
            addedCode.push(n - (n >= 65 ? 55 : 48));
        }
        let decodedMinusCodeStr;
        try { decodedMinusCodeStr = this.num_decode(minusCodeStr) } catch (e) { throw new Error('Fail to decode') }
        for (let i in decodedMinusCodeStr) {
            const n = decodedMinusCodeStr.charCodeAt(i);
            minusCode.push(n - (n >= 65 ? 55 : 48));
        }
        const processedCode = [];
        for (let i in addedCode) {
            if (minusCode[i] !== undefined) processedCode.push(addedCode[i] - minusCode[i], minusCode[i]);
            else processedCode.push(addedCode[i]);
        }
        //console.log({ addedCode, minusCode, addedCodeStr, minusCodeStr, processedCode });
        return String.fromCharCode(...processedCode.map(n => n + (n >= 10 ? 55 : 48)));
    }

    encode(code) {
        if (!code) return;
        let codeUnicode = [], maxNum = 0;
        for (let i in code) {
            const charCode = String(code.charCodeAt(i));
            codeUnicode.push(this.num_encode(charCode));
            if (charCode.length > maxNum) maxNum = charCode.length;
        }
        //console.log({ codeUnicode });
        return (
            String(maxNum) +
            codeUnicode.map(v => v.padStart(maxNum, '0')).join('')
        );
    }

    decode(code) {
        if (!code) return;
        const maxNum = Number(code[0]);
        code = code.slice(1);
        let processedCode = [];
        for (let i = 0; (i + maxNum) <= code.length; i += maxNum) {
            const codeUnicode = Number(this.num_decode(minusZero(code.substr(i, maxNum))));
            processedCode.push(codeUnicode);
        }
        //console.log({ processedCode });
        return String.fromCharCode(...processedCode);
    }

}

function minusZero(str = '') {
    if (str[0] !== '0') return str;
    let lastZero = 0;
    for (let i in str) {
        if (str[i] === '0') lastZero = i;
        else return str.slice(Number(lastZero) + 1);
    }
}

export default MinusCode;