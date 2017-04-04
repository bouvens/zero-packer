import React from 'react'
import ControlledComponent from './ControlledComponent'
import InnerRadio from './InnerRadio'

const Radio = (props) => (
    <ControlledComponent {...props} >
        <InnerRadio />
    </ControlledComponent>
)

export default Radio
