import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import { lime } from "@material-ui/core/colors";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SocialButton from "../components/SocialButton";
import classes from "../styles/Auth.module.scss";

// import facebookIcon from "../assets/images/facebookIcon.png";
// import googleIcon from "../assets/images/googleIcon.png";
// import twitterIcon from "../assets/images/twitterIcon.png";

const OrangeCheckbox = withStyles({
  root: {
    color: lime["A700"],
    "&$checked": {
      color: lime["A700"],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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

const Login = (props) => {
  // State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please fill in all form fields."
  );

  const submitForm = (e) => {
    e.preventDefault();

    // Reset state
    setShowAlert(false);

    let isValid = false;

    // Form Validation
    if (email != "" && password != "") {
      if (isEmail(email) && password.length >= 6) isValid = true;
      else if (!isEmail(email)) setErrorMessage("Invalid email address.");
      else if (password.length < 6)
        setErrorMessage("Password must be at least 6 symbols.");
      else setErrorMessage("Incorrect email or password.");
    } else {
      setErrorMessage("Please fill in all form fields");
    }

    // Save credentials in local storage
    // if(isChecked){
    //   localStorage.setItem('email', email);
    // }

    // Update state
    if (isValid) setIsFormValid(true);
    else setIsFormValid(false);

    setShowAlert(true);
  };

  // Change alert messages on invalid form
  let alert = (
    <Alert style={{ marginBottom: "15px" }} severity="error">
      {errorMessage}
    </Alert>
  );

  // Change alert messages on valid form
  if (isFormValid) {
    alert = (
      <Alert style={{ marginBottom: "15px" }} severity="success">
        Successfully logged in.
      </Alert>
    );
  }

  return (
    <div className={classes.login_page}>
      <div className={classes.login_container}>
        <form onSubmit={(e) => submitForm(e)} className={classes.login_form}>
          <h1 className={classes.form_heading}>Log in with</h1>

          <div className={classes.form_heading}>
            <SocialButton
              platform="Facebook"
              src={"/images/facebookIcon.png"}
            />
            <SocialButton platform="Google" src={"/images/googleIcon.png"} />
            <SocialButton platform="Twitter" src={"/images/twitterIcon.png"} />
          </div>

          <p className={classes.line_break_label}>or</p>

          {/* Alert */}
          {showAlert && alert}

          <div className={classes.form_controls}>
            <ColoredTextField
              className={classes.form_field}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email-field"
              label="Email"
              // variant="outlined"
              size="small"
            />
            <ColoredTextField
              className={classes.form_field}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password-field"
              label="Password"
              // variant="outlined"
              size="small"
            />
            <div className={classes.checkbox}>
              <FormControlLabel
                control={
                  <OrangeCheckbox
                    checked={isChecked}
                    title="remember me"
                    onChange={(e) => setIsChecked(e.target.checked)}
                    id="checkbox"
                  />
                }
                label="Remember me"
              />
            </div>
          </div>

          <Button
            id="submit-button"
            type="submit"
            className={classes.submit_button}
            variant="outlined"
            color="primary"
            fullWidth
            size="large"
          >
            Log in
          </Button>

          <div className={classes.change_auth}>
            Don't have an account?{" "}
            <a className={classes.sign_up_link}>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

const isEmail = (email) => {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!regEmail.test(email)) {
    return false;
  } else {
    return true;
  }
};

export default Login;
