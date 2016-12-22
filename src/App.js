import React, { PropTypes, Component } from 'react'
import { LabeledTextarea } from './components/LabeledControl'
import './App.css'

const IDS = {
    textToPacked: 'textToPacked',
    packedFromText: 'packedFromText',
    packedToText: 'packedToText',
    textFromPacked: 'textFromPacked',
}

class ZeroPacker extends Component {
    render () {
        return (
            <form className="encoder">
                <LabeledTextarea id={IDS.textToPacked} label="Text"/>
                →
                <LabeledTextarea id={IDS.packedFromText} label="Packed"/>
                <button>Move packed ↓</button>
                <LabeledTextarea id={IDS.packedToText} label="Text"/>
                →
                <LabeledTextarea id={IDS.textFromPacked} label="Packed"/>
            </form>
        )
    }
}

const App = () => (
    <ZeroPacker/>
)

export default App
