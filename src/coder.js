export function encodeToSymbols (stringForEncoding, symbols) {
    const base = Math.min(symbols.length - 1, 36) // 16
    const charCodes = stringForEncoding // '«test»'
        .split('') // ['«', 't', 'e', 's', 't', '»']
        .map((char) => char // '«'
            .charCodeAt(0) // 171
            .toString(base) // 'ab'
            .split('') // ['a', 'b']
            .map((numberInBase) => {
                const index = parseInt(numberInBase, base) // 10
                return symbols[index] // 'a'
            })
            .join('') // 'ab'
        )

    return `0${charCodes.join(symbols[base])}` // '0abg74g65g73g74gbb'
}

export function decodeFromSymbols (stringForDecoding, symbols) {
    const base = Math.min(symbols.length - 1, 36) // 16

    return stringForDecoding // '0abg74g65g73g74gbb'
        .slice(1) // 'abg74g65g73g74gbb'
        .split(symbols[base]) // ['ab', '74', '65', '73', '74', 'bb']
        .map((encodedNumber) => {
            const asciiNumber = encodedNumber // 'ab'
                .split('') // ['a', 'b']
                .map((char) => { // 'a'
                    const index = symbols.indexOf(char) // 10
                    return index.toString(base) // 'a'
                })
                .join('') // 'ab'
            const asciiCode = parseInt(asciiNumber, base) // 171
            return String.fromCharCode(asciiCode) // '«'
        })
        .join('') // '«test»'
}
