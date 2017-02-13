import React from 'react'
import ZeroPacker from './components/ZeroPacker'
import './App.css'

const DEFAULTS = {
    leader: '0',
    symbols: [
        0x2060,
        0x2061,
        0x2062,
        0x2063,
        0x180E,
        0x200B,
        0x200C,
        0x200D,
        0xFEFF,
    ].map((uCode) => String.fromCharCode(uCode)).join(''),
    textToPacked: '“test”',
    packedToText: '',
}

const SETTERS = [
    {
        params: {
            leader: DEFAULTS.leader,
            symbols: DEFAULTS.symbols,
        },
        text: 'Zero-width symbols with leading zero'
    },
    {
        params: {
            leader: '',
            symbols: '0123456789,',
        },
        text: 'Comma separated unicode codes'
    },
    {
        params: {
            leader: '',
            symbols: '↑↓←→BA ',
        },
        text: 'Arbitrary symbols'
    },
    {
        params: {
            leader: '',
            symbols: '·•×⌀',
        },
        text: 'More'
    },
]

const App = () => (
    <ZeroPacker
        defaults={DEFAULTS}
        setters={SETTERS}
    />
)

export default App
