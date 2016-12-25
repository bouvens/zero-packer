import React  from 'react'
import { LabeledControl } from './LabeledControl'
import propTypes from './propTypes'

export class LabeledInput extends React.Component {
    static propTypes = propTypes

    input = null
    saveRef = (input) => { this.input = input }

    render () {
        return (
            <LabeledControl
                id={this.props.id}
                label={this.props.label}
            >
                <input
                    id={this.props.id}
                    ref={this.saveRef}
                    value={this.props.value || ''}
                    onChange={this.props.onChange}
                    readOnly={this.props.readOnly}
                    onClick={this.props.onClick ? this.props.onClick(this) : null}
                />
            </LabeledControl>
        )
    }
}
