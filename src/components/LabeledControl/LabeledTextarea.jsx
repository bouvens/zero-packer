import React, { PropTypes } from 'react'
import { LabeledControl } from './LabeledControl'

export const LabeledTextarea = (props) => (
    <LabeledControl
        id={props.id}
        label={props.label}
    >
        <textarea
            id={props.id}
            value={props.value || null}
            onChange={props.onChange}
        />
    </LabeledControl>
)

LabeledTextarea.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
}
