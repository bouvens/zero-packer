import React from 'react'
import PropTypes from 'prop-types'
import { Connector, Input, SettersBlock } from 'state-control'
import { decodeFromSymbols, encodeToSymbols } from '../coder'
import './ZeroPacker.css'

export default class ZeroPacker extends React.Component {
    static propTypes = {
        defaults: PropTypes.objectOf(PropTypes.string).isRequired,
        setters: PropTypes.arrayOf(PropTypes.object).isRequired,
    }

    state = this.props.defaults

    getSymbols = () => (this.state.symbols.length > 2 ? this.state.symbols : this.props.defaults.symbols)
    getEncoded = () => encodeToSymbols(this.state.textToPacked, this.getSymbols(), this.state.leader)
    getDecoded = () => decodeFromSymbols(this.state.packedToText, this.getSymbols(), this.state.leader)

    IDS = {
        leader: 'leader',
        symbols: 'symbols',
        textToPacked: 'textToPacked',
        packedFromText: 'packedFromText',
        packedToText: 'packedToText',
        textFromPacked: 'textFromPacked',
    }

    changeHandler = (name, initialValue) => {
        let value = initialValue.toString()

        switch (name) {
            case this.IDS.leader:
                value = value.slice(-1)
                break
            case this.IDS.symbols:
                value = value
                    .split('')
                    .filter((char, i, arr) => arr.indexOf(char) === i && char !== this.state.leader)
                    .join('')
                    .slice(-36)
                break
            default:
        }

        this.setState({ [name]: value })
    }

    move = () => {
        this.setState({ [this.IDS.packedToText]: this.getEncoded() })
    }

    selectAll = (control) => control.setSelectionRange(0, control.value.length)

    render () {
        return [
            <SettersBlock
                setters={this.props.setters}
                setHandler={this.changeHandler}
                className="state-control-setters"
                key="setters"
            />,
            <Connector
                state={this.state}
                onChange={this.changeHandler}
                onFocus={this.selectAll}
                className="state-control-input"
                key="connector"
            >
                <Input
                    id={this.IDS.leader}
                    label="Leading symbol"
                />
                <div className="arrow">+</div>
                <Input
                    id={this.IDS.symbols}
                    label="Symbols for packing"
                />
                <Input
                    id={this.IDS.textToPacked}
                    label="Text"
                    multiLine
                />
                <div className="arrow">→</div>
                <Input
                    id={this.IDS.packedFromText}
                    label="Packed"
                    value={this.getEncoded()}
                    readOnly
                    multiLine
                />
                <button className="move-button" onClick={this.move}>Copy packed ↓</button>
                <Input
                    id={this.IDS.packedToText}
                    label="Packed"
                    multiLine
                />
                <div className="arrow">→</div>
                <Input
                    id={this.IDS.textFromPacked}
                    label="Text"
                    value={this.getDecoded()}
                    readOnly
                    multiLine
                />
            </Connector>,
        ]
    }
}
