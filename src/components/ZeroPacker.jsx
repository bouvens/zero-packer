import React, { PropTypes } from 'react'
import { encodeToSymbols, decodeFromSymbols } from '../coder'
import { LabeledTextarea } from './LabeledControl'
import './ZeroPacker.css'

const IDS = {
    textToPacked: 'textToPacked',
    packedFromText: 'packedFromText',
    packedToText: 'packedToText',
    textFromPacked: 'textFromPacked',
}

export default class ZeroPacker extends React.Component {
    static propTypes = {
        defaults: PropTypes.object,
        symbols: PropTypes.array,
    }

    constructor (props) {
        super(props)
        this.state = this.props.defaults
    }

    changeHandler = (state) => (event) => {
        this.setState({ [state]: event.target.value })
    }

    getEncoded = () => encodeToSymbols(this.state.textToPacked, this.props.symbols)
    getDecoded = () => decodeFromSymbols(this.state.packedToText, this.props.symbols)

    move = () => {
        this.setState({ [IDS.packedToText]: this.getEncoded() })
    }

    selectAll = (_this) => () => _this.textArea.setSelectionRange(0, _this.textArea.value.length)

    render () {
        return (
            <div className="encoder">
                <LabeledTextarea
                    id={IDS.textToPacked}
                    label="Text"
                    value={this.state.textToPacked}
                    onChange={this.changeHandler(IDS.textToPacked)}
                    onFocus={this.selectAll}
                />
                <div className="arrow">→</div>
                <LabeledTextarea
                    id={IDS.packedFromText}
                    label="Packed"
                    value={this.getEncoded()}
                    readOnly
                    onClick={this.selectAll}
                />
                <button className="move" onClick={this.move}>Move packed ↓</button>
                <LabeledTextarea
                    id={IDS.packedToText}
                    label="Packed"
                    value={this.state.packedToText}
                    onChange={this.changeHandler(IDS.packedToText)}
                    onClick={this.selectAll}
                />
                <div className="arrow">→</div>
                <LabeledTextarea
                    id={IDS.textFromPacked}
                    label="Text"
                    value={this.getDecoded()}
                    readOnly
                    onClick={this.selectAll}
                />
            </div>
        )
    }
}
