import React from 'react'
import ZeroPacker from './components/ZeroPacker'

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
        text: 'Zero-width symbols with leading zero',
        params: {
            leader: DEFAULTS.leader,
            symbols: DEFAULTS.symbols,
        },
    },
    {
        text: 'Comma separated unicode codes',
        params: {
            leader: '',
            symbols: '0123456789,',
        },
    },
    {
        text: 'Arbitrary symbols',
        params: {
            leader: '',
            symbols: '↑↓←→BA ',
        },
    },
    {
        text: 'More',
        params: {
            leader: '',
            symbols: '·•×⌀',
        },
    },
]

const App = () => (
    <ZeroPacker
        defaults={DEFAULTS}
        setters={SETTERS}
    />
)

export default App
