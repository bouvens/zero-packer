import React from 'react'
import ZeroPacker from './components/ZeroPacker'
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

const App = () => (
    <ZeroPacker defaults={DEFAULTS} ids={IDS} symbols={SYMBOLS} />
)

export default App
