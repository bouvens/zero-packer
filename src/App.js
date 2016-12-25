import React from 'react'
import ZeroPacker from './components/ZeroPacker'
import './App.css'

const DEFAULTS = {
    textToPacked: '«test»',
    packedToText: '',
}
const SYMBOLS = [
    0x2060,
    0x2061,
    0x2062,
    0x2063,
    0x180E,
    0x200B,
    0x200C,
    0x200D,
    0xFEFF,
].map((uCode) => String.fromCharCode(uCode))

const App = () => (
    <ZeroPacker defaults={DEFAULTS} symbols={SYMBOLS} />
)

export default App
