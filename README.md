# Zero ~~Width~~ Packer

### [Demo](https://bouvens.github.io/zero-packer/)

This experiment is made with [state-control ![npm][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/state-control.png?style=flat-square

[npm]: https://www.npmjs.org/package/state-control

## What's this?

This coder transforms Unicode strings into new ones consisting of any set of symbols (from 3 to 36 ones). You can
also, decode a resulting string.

## How can I use the Zero-Width Packer?

The packer can be used for steganography with zero-width symbols or as a non-safe coder.

## Encoding and decoding

[Core code](https://github.com/bouvens/zero-packer/blob/master/src/coder.js) is quite small:

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

The functions convert every character in an input string to its Unicode number. The number is converted to a
number that is base _N_. _N_ is equal to the number of characters for encoding minus 1. We have minus 1 because the last character is
used as a separator. Then each number is mapped to a corresponding symbol for encoding.

## How to run locally

Run in console:

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
