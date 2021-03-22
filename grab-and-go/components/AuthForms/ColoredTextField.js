import React from "react";
import classes from "../../styles/Auth.module.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

// const ColoredTextField = withStyles({
//   root: {
//     "& label.Mui-focused": {
//       color: "#f50057"
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "#f50057"
//     },
//     "& .MuiOutlinedInput-root": {
//       "&.Mui-focused fieldset": {
//         borderColor: "#f50057"
//       }
//     }
//   }
// })(TextField);

const ColoredTextInput = (props) => {
  return (
    <TextField
      className={classes.form_field}
      value={props.value}
      onChange={(e) => props.handleChange(e)}
      type={props.type}
      id={`${props.name}-field`}
      name={props.name}
      label={props.label}
      size="small"
      fullWidth
    />
  );
};

export default ColoredTextInput;
