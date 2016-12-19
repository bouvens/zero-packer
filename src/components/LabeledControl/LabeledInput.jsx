import React, { PropTypes } from 'react'
import { LabeledControl } from './LabeledControl'

export const LabeledInput = (props) => (
    <LabeledControl
        id={props.id}
        label={props.label}
    >
        <input
            id={props.id}
            value={props.value || null}
            onChange={props.onChange}
        />
    </LabeledControl>
)

LabeledInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
}
