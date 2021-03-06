import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import ColoredTextField from '../components/AuthForms/ColoredTextField'
import { lime } from "@material-ui/core/colors";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Typography,
  Box
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SocialButton from "../components/AuthForms/SocialButton";
import classes from "../styles/Auth.module.scss";

// import facebookIcon from "../assets/images/facebookIcon.png";
// import googleIcon from "../assets/images/googleIcon.png";
// import twitterIcon from "../assets/images/twitterIcon.png";

const LimeCheckbox = withStyles({
  root: {
    color: lime["A700"],
    "&$checked": {
      color: lime["A700"],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "500px",
    margin: "0 auto",
    textAlign: "center",
    borderRadius: "30px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "600",
    marginTop: "10px",
    marginBottom: "30px"
  }
}));

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

  const styles = useStyles();

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
      <Paper className={styles.root} elevation={5}>
        <form onSubmit={(e) => submitForm(e)} className={classes.login_form}>
          <Typography color="secondary" className={styles.title}>
            Log In
          </Typography>

          <Box display="flex" justifyContent="center">
            <SocialButton
              platform="Facebook"
              src={"/images/facebookIcon.png"}
            />
            <SocialButton platform="Google" src={"/images/googleIcon.png"} />
            <SocialButton platform="Twitter" src={"/images/twitterIcon.png"} />
          </Box>

          <p className={classes.line_break_label}>or</p>

          {/* Alert */}
          {showAlert && alert}

          <div className={classes.form_controls}>
            <ColoredTextField
              label="Email"
              name="email"
              value={email}
              type="text"
              handleChange={(e) => setEmail(e.target.value)}
            />
            <ColoredTextField
              label="Password"
              name="password"
              value={password}
              type="password"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <div className={classes.checkbox}>
              <FormControlLabel
                control={
                  <LimeCheckbox
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
            variant="contained"
            color="primary"
            fullWidth
            size="large"
          >
            Sign In
          </Button>

          <div className={classes.change_auth}>
            Don't have an account?{" "}
            <a className={classes.sign_up_link}>Sign Up</a>
          </div>
        </form>
      </Paper>
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
