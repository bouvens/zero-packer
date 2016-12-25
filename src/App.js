import React, { PropTypes, Component } from 'react'
import { LabeledTextarea } from './components/LabeledControl'
import './App.css'

const DEFAULTS = {
    textToPacked: '«test»',
    packedToText: '«test»',
}
const IDS = {
    textToPacked: 'textToPacked',
    packedFromText: 'packedFromText',
    packedToText: 'packedToText',
    textFromPacked: 'textFromPacked',
}
const SYMBOLS = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
]

function encodeToSymbols (stringForEncoding, symbols) {
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

    return charCodes.join(symbols[base]) // 'abg74g65g73g74gbb'
}

function decodeFromSymbols (stringForDecoding, symbols) {
    const base = Math.min(symbols.length - 1, 36) // 16

    return stringForDecoding // 'abg74g65g73g74gbb'
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

class ZeroPacker extends Component {
    constructor (props) {
        super(props)
        this.state = DEFAULTS
    }

    changeHandler = (state) => (event) => {
        this.setState({ [state]: event.target.value })
    }

    getEncoded = () => encodeToSymbols(this.state.textToPacked, SYMBOLS)
    getDecoded = () => decodeFromSymbols(this.state.packedToText, SYMBOLS)

    move = (event) => {
        this.setState({ [IDS.packedToText]: this.getEncoded() })
    }

    render () {
        return (
            <div className="encoder">
                <LabeledTextarea
                    id={IDS.textToPacked}
                    label="Text"
                    value={this.state.textToPacked}
                    onChange={this.changeHandler(IDS.textToPacked)}
                />
                →
                <LabeledTextarea
                    id={IDS.packedFromText}
                    label="Packed"
                    value={this.getEncoded()}
                    readOnly
                />
                <button onClick={this.move}>Move packed ↓</button>
                <LabeledTextarea
                    id={IDS.packedToText}
                    label="Packed"
                    value={this.state.packedToText}
                    onChange={this.changeHandler(IDS.packedToText)}
                />
                →
                <LabeledTextarea
                    id={IDS.textFromPacked}
                    label="Text"
                    value={this.getDecoded()}
                    readOnly
                />
            </div>
        )
    }
}

const App = () => (
    <ZeroPacker/>
)

export default App
