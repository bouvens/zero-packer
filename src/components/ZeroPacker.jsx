import React, { PropTypes } from 'react'
import { encodeToSymbols, decodeFromSymbols } from '../coder'
import { LabeledInput, LabeledTextarea } from './LabeledControl'
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
        <a onClick={props.onClick(props.params)} tabIndex={props.key + 1}>{props.text}</a>
    </div>
)

Setter.propTypes = {
    params: PropTypes.object,
    text: PropTypes.string,
    key: PropTypes.number,
    onClick: PropTypes.func,
}

export default class ZeroPacker extends React.Component {
    static propTypes = {
        defaults: PropTypes.object,
    }
    static defaultProps = {
        defaults: DEFAULTS,
    }

    constructor (props) {
        super(props)
        this.state = this.props.defaults
        this.setters = SETTERS.map((setter, index) => <Setter
            onClick={(state) => () => this.setState(state)}
            key={index}
            {...setter}
        />)
    }

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
                {this.setters}
                <LabeledInput
                    id={IDS.leader}
                    label="Leading symbol"
                    className="leader"
                    value={this.state[IDS.leader]}
                    onChange={this.changeHandler(IDS.leader)}
                    onFocus={this.selectAll}
                />
                <div className="arrow">+</div>
                <LabeledInput
                    id={IDS.symbols}
                    label="Symbols for packing"
                    className="symbols"
                    value={this.state[IDS.symbols]}
                    onChange={this.changeHandler(IDS.symbols)}
                    onFocus={this.selectAll}
                />
                <LabeledTextarea
                    id={IDS.textToPacked}
                    label="Text"
                    value={this.state[IDS.textToPacked]}
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
                    value={this.state[IDS.packedToText]}
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
