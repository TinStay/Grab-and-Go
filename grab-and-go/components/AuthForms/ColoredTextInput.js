import React from 'react'
import classes from '../../styles/Auth.module.scss'

const ColoredTextInput = (props) => {
    return (
        <ColoredTextField
              className={classes.form_field}
              value={props.value}
              onChange={(e) => props.handleChange(e)}
              type={props.type}
              id={`${props.name}-field`}
              label={props.label}
              name={props.name}
              size="small"
            />
    )
}

export default ColoredTextInput
