import React  from 'react'
import { LabeledControl } from './LabeledControl'
import propTypes from './propTypes'
import './LabeledTextarea.css'

export class LabeledTextarea extends React.Component {
    static propTypes = propTypes

    control = null
    saveRef = (control) => this.control = control

    render () {
        return (
            <LabeledControl
                id={this.props.id}
                label={this.props.label}
            >
                <textarea
                    id={this.props.id}
                    ref={this.saveRef}
                    value={this.props.value || ''}
                    onChange={this.props.onChange}
                    readOnly={this.props.readOnly}
                    onClick={this.props.onClick ? this.props.onClick(this) : null}
                    onFocus={this.props.onFocus ? this.props.onFocus(this) : null}
                />
            </LabeledControl>
        )
    }
}
