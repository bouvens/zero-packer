import React, { PropTypes } from 'react'

export const LabeledControl = (props) => (
    <div className="labeled-input">
        <label htmlFor={props.id}>{props.label}: </label>
        {props.children}
    </div>
)

LabeledControl.propTypes = {
    children: PropTypes.element.isRequired,
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
}
