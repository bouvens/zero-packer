import React, { PropTypes } from 'react'
import { encodeToSymbols, decodeFromSymbols } from '../coder'
import { LabeledTextarea } from './LabeledControl'

export default class ZeroPacker extends React.Component {
    static propTypes = {
        defaults: PropTypes.object,
        ids: PropTypes.object,
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
        this.setState({ [this.props.ids.packedToText]: this.getEncoded() })
    }

    selectAll = (_this) => () => _this.textArea.setSelectionRange(0, _this.textArea.value.length)

    render () {
        return (
            <div className="encoder">
                <LabeledTextarea
                    id={this.props.ids.textToPacked}
                    label="Text"
                    value={this.state.textToPacked}
                    onChange={this.changeHandler(this.props.ids.textToPacked)}
                />
                →
                <LabeledTextarea
                    id={this.props.ids.packedFromText}
                    label="Packed"
                    value={this.getEncoded()}
                    readOnly
                    onClick={this.selectAll}
                />
                <button onClick={this.move}>Move packed ↓</button>
                <LabeledTextarea
                    id={this.props.ids.packedToText}
                    label="Packed"
                    value={this.state.packedToText}
                    onChange={this.changeHandler(this.props.ids.packedToText)}
                />
                →
                <LabeledTextarea
                    id={this.props.ids.textFromPacked}
                    label="Text"
                    value={this.getDecoded()}
                    readOnly
                    onClick={this.selectAll}
                />
            </div>
        )
    }
}
