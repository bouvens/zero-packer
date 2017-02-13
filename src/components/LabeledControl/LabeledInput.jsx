import React, { PropTypes } from 'react'
import './LabeledInput.css'

export class LabeledInput extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        stateName: PropTypes.string,
        label: PropTypes.string.isRequired,
        state: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        onChange: PropTypes.func,
        onClick: PropTypes.func,
        onFocus: PropTypes.func,
        multiLine: PropTypes.bool,
    }

    defaultProps = {
        multiLine: false,
    }

    inner = this.props.multiLine ? 'textarea' : 'input'
    id = `labeled-control-${this.props.id}`
    stateName = this.props.stateName || this.props.id

    render () {
        return (
            <div className="labeled-input">
                <label htmlFor={this.id}>{this.props.label}: </label>
                <this.inner
                    id={this.id}
                    label={this.props.label}
                    ref={(control) => { this.control = control }}
                    value={this.props.value || this.props.state[this.stateName] || ''}
                    onChange={this.props.onChange && this.props.onChange(this.stateName)}
                    readOnly={this.props.readOnly}
                    onClick={this.props.onClick ? this.props.onClick(this) : null}
                    onFocus={this.props.onFocus ? this.props.onFocus(this) : null}
                />
            </div>
        )
    }
}
