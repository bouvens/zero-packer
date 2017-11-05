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

const SETTERS = {
    'Zero-width symbols with leading zero': {
        leader: DEFAULTS.leader,
        symbols: DEFAULTS.symbols,
    },
    'Comma separated unicode codes': {
        leader: '',
        symbols: '0123456789,',
    },
    'Arbitrary symbols': {
        leader: '',
        symbols: '↑↓←→BA ',
    },
    More: {
        leader: '',
        symbols: '·•×⌀',
    },
}

const App = () => (
    <ZeroPacker
        defaults={DEFAULTS}
        setters={SETTERS}
    />
)

export default App
