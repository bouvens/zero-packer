import React  from 'react'
import { LabeledControl } from './LabeledControl'
import propTypes from './propTypes'

export const LabeledInput = (props) => (
    <LabeledControl
        id={props.id}
        label={props.label}
    >
        <input
            id={props.id}
            value={props.value || ''}
            onChange={props.onChange}
            readOnly={props.readOnly}
        />
    </LabeledControl>
)

LabeledInput.propTypes = propTypes
