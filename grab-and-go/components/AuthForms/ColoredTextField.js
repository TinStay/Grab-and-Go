import React from 'react'
import classes from '../../styles/Auth.module.scss'
import { withStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'

const ColoredTextField = withStyles({
    root: {
      "& label.Mui-focused": {
        color: "#7eb92c",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "#7eb92c",
      },
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#7eb92c",
        },
      },
    },
  })(TextField);


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
