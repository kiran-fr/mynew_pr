import React from 'react'
import  PropTypes  from 'prop-types'
export default function PropTypess(props) {
    const children = props.name
    console.log(children)
    return (
        <div>
            <h1>{children}</h1>
        </div>
    )
}

PropTypess.prototypes = {
    name:PropTypes.string
}