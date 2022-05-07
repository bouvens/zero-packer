# Zero ~~Width~~ Packer

### [Demo](https://bouvens.github.io/zero-packer/)

This experiment made with [state-control ![npm][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square

[npm]: https://www.npmjs.org/package/state-control

## What's this?

This encipherer encodes strings using a selected set of symbols (from 3 to 36). It just takes any Unicode
string and converts it. You can also decode the resulting string.

## How can I use the Zero-Width Packer?

You can use the packer for steganography with zero-width symbols.

## Encoding and decoding

The [core code](https://github.com/bouvens/zero-packer/blob/master/src/coder.js) is pretty small:

```javascript
export function encodeToSymbols(stringForEncoding, symbols, leader) {
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
      .join('')) // 'ab'

  return `${leader}${charCodes.join(symbols[base])}` // '0abg74g65g73g74gbb'
}

export function decodeFromSymbols(stringForDecoding, symbols, leader) {
  const base = Math.min(symbols.length - 1, 36) // 16

  return stringForDecoding // '0abg74g65g73g74gbb'
    .slice(leader.length) // 'abg74g65g73g74gbb'
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
```

The code processes every character in the string as its Unicode number. The number is converted to a base
equal to the number of characters for encoding minus 1. Then each number is mapped to the appropriate symbol
for encoding. The last character is used as a separator.

## How to run locally

Run in bash:

```Shell
git clone git@github.com:bouvens/zero-packer.git
cd zero-packer
npm install
npm run start
```

Also, there's a script for a local build:

```Shell
npm run build
```
