import React, { PropTypes } from 'react'
import { encodeToSymbols, decodeFromSymbols } from '../coder'
import { LabeledInput } from './LabeledControl'
import './ZeroPacker.css'

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
const IDS = {
    leader: 'leader',
    symbols: 'symbols',
    textToPacked: 'textToPacked',
    packedFromText: 'packedFromText',
    packedToText: 'packedToText',
    textFromPacked: 'textFromPacked',
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

const Setter = (props) => (
    <div className="setter">
        <a onClick={props.onClick(props.params)} tabIndex={props.tabIndex}>{props.text}</a>
    </div>
)

Setter.propTypes = {
    params: PropTypes.object,
    text: PropTypes.string,
    tabIndex: PropTypes.number,
    onClick: PropTypes.func,
}

export default class ZeroPacker extends React.Component {
    static propTypes = {
        defaults: PropTypes.object,
    }
    static defaultProps = {
        defaults: DEFAULTS,
    }

    state = this.props.defaults

    changeHandler = (state) => (event) => {
        const initialValue = event.target.value
        let value

        switch (state) {
            case IDS.leader:
                value = initialValue.slice(-1)
                break
            case IDS.symbols:
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
        this.setState({ [IDS.packedToText]: this.getEncoded() })
    }

    selectAll = (_this) => () => _this.control.setSelectionRange(0, _this.control.value.length)

    render () {
        return (
            <div className="encoder">
                {SETTERS.map((setter, index) => (
                    <Setter
                        onClick={(state) => () => this.setState(state)}
                        key={index}
                        tabIndex={index + 1}
                        {...setter}
                    />
                ))}
                <LabeledInput
                    id={IDS.leader}
                    label="Leading symbol"
                    className="leader"
                    state={this.state}
                    onChange={this.changeHandler}
                    onFocus={this.selectAll}
                />
                <div className="arrow">+</div>
                <LabeledInput
                    id={IDS.symbols}
                    label="Symbols for packing"
                    className="symbols"
                    state={this.state}
                    onChange={this.changeHandler}
                    onFocus={this.selectAll}
                />
                <LabeledInput
                    id={IDS.textToPacked}
                    label="Text"
                    state={this.state}
                    onChange={this.changeHandler}
                    onFocus={this.selectAll}
                    multiLine
                />
                <div className="arrow">→</div>
                <LabeledInput
                    id={IDS.packedFromText}
                    label="Packed"
                    value={this.getEncoded()}
                    readOnly
                    onClick={this.selectAll}
                    multiLine
                />
                <button className="move" onClick={this.move}>Move packed ↓</button>
                <LabeledInput
                    id={IDS.packedToText}
                    label="Packed"
                    state={this.state}
                    onChange={this.changeHandler}
                    onClick={this.selectAll}
                    multiLine
                />
                <div className="arrow">→</div>
                <LabeledInput
                    id={IDS.textFromPacked}
                    label="Text"
                    value={this.getDecoded()}
                    readOnly
                    onClick={this.selectAll}
                    multiLine
                />
            </div>
        )
    }
}
