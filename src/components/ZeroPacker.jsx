import React, { PropTypes } from 'react'
import { encodeToSymbols, decodeFromSymbols } from '../coder'
import StateControl from './StateControl'
import './ZeroPacker.css'

export default class ZeroPacker extends React.Component {
    static propTypes = {
        defaults: PropTypes.object.isRequired,
        setters: PropTypes.array.isRequired,
    }

    state = this.props.defaults

    IDS = {
        leader: 'leader',
        symbols: 'symbols',
        textToPacked: 'textToPacked',
        packedFromText: 'packedFromText',
        packedToText: 'packedToText',
        textFromPacked: 'textFromPacked',
    }

    changeHandler = (state) => (event) => {
        const initialValue = event.target.value
        let value

        switch (state) {
            case this.IDS.leader:
                value = initialValue.slice(-1)
                break
            case this.IDS.symbols:
                value = initialValue
                    .split('')
                    .filter((char, i, arr) => arr.indexOf(char) === i && char !== this.state.leader)
                    .join('')
                    .slice(-36)
                break
            default:
                value = initialValue
        }
        this.setState({ [state]: value })
    }

    getSymbols = () => (this.state.symbols.length > 2 ? this.state.symbols : this.props.defaults.symbols)
    getEncoded = () => encodeToSymbols(this.state.textToPacked, this.getSymbols(), this.state.leader)
    getDecoded = () => decodeFromSymbols(this.state.packedToText, this.getSymbols(), this.state.leader)

    move = () => {
        this.setState({ [this.IDS.packedToText]: this.getEncoded() })
    }

    selectAll = (_this) => () => _this.control.setSelectionRange(0, _this.control.value.length)
    setStateHandler = (state) => this.setState(state)

    render () {
        return (
            <div className="encoder">
                <StateControl.SettersBlock
                    setters={this.props.setters}
                    setState={this.setStateHandler}
                />
                <StateControl.Connector
                    state={this.state}
                    onChange={this.changeHandler}
                    onFocus={this.selectAll}
                >
                    <StateControl.Input
                        id={this.IDS.leader}
                        label="Leading symbol"
                        className="leader"
                    />
                    <div className="arrow">+</div>
                    <StateControl.Input
                        id={this.IDS.symbols}
                        label="Symbols for packing"
                        className="symbols"
                    />
                    <StateControl.Input
                        id={this.IDS.textToPacked}
                        label="Text"
                        multiLine
                    />
                    <div className="arrow">→</div>
                    <StateControl.Input
                        id={this.IDS.packedFromText}
                        label="Packed"
                        value={this.getEncoded()}
                        readOnly
                        multiLine
                    />
                    <button className="move" onClick={this.move}>Move packed ↓</button>
                    <StateControl.Input
                        id={this.IDS.packedToText}
                        label="Packed"
                        multiLine
                    />
                    <div className="arrow">→</div>
                    <StateControl.Input
                        id={this.IDS.textFromPacked}
                        label="Text"
                        value={this.getDecoded()}
                        readOnly
                        multiLine
                    />
                </StateControl.Connector>
            </div>
        )
    }
}
