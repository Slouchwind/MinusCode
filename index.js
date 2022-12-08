export function num_encode(code) {
    if (code.length === 0 || code.length === 1) return code;
    if (code.length % 2 === 1 && code.length !== 1) code += '=';
    let addedCode = [], minusCode = [];
    for (let i = 0; i + 2 <= code.length; i += 2) {
        if (code[i + 1] === '=') addedCode.push(Number(code[i]));
        else {
            const NUM = Number(code[i]), NEXT_NUM = Number(code[i + 1]);
            addedCode.push(NUM + NEXT_NUM);
            minusCode.push(NEXT_NUM);
        }
    }
    const minusCodeStr = minusCode.toString().replaceAll(',', '');
    return (
        String.fromCharCode(...addedCode.map(n => n + (n >= 10 ? 55 : 48))) +
        num_encode(minusCodeStr)
    );
}

export function num_decode(code) {
    if (code.length === 0 || code.length === 1) return code;
    let addedCodeStr = code.slice(0, code.length / 2 + 0.5), minusCodeStr = code.slice(addedCodeStr.length - code.length);
    let addedCode = [], minusCode = [];
    for (let i in addedCodeStr) {
        const n = addedCodeStr.charCodeAt(i);
        addedCode.push(n - (n >= 65 ? 55 : 48));
    }
    const decodedMinusCodeStr = num_decode(minusCodeStr);
    for (let i in decodedMinusCodeStr) {
        const n = decodedMinusCodeStr.charCodeAt(i);
        minusCode.push(n - (n >= 65 ? 55 : 48));
    }
    const processedCode = [];
    for (let i in addedCode) {
        if (minusCode[i]) processedCode.push(addedCode[i] - minusCode[i], minusCode[i]);
        else processedCode.push(addedCode[i]);
    }
    return String.fromCharCode(...processedCode.map(n => n + (n >= 10 ? 55 : 48)));
}

