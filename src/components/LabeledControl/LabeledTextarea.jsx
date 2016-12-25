import React  from 'react'
import { LabeledControl } from './LabeledControl'
import propTypes from './propTypes'

function selectAll () {
    console.log(this)
    this.setSelectionRange(0, this.value.length)
}

export const LabeledTextarea = (props) => (
    <LabeledControl
        id={props.id}
        label={props.label}
    >
        <textarea
            id={props.id}
            value={props.value || ''}
            onChange={props.onChange}
            readOnly={props.readOnly}
            onClick={selectAll.bind(this)}
        />
    </LabeledControl>
)

LabeledTextarea.propTypes = propTypes
