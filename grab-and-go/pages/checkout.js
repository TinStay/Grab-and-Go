import React from "react";
import { useStoreContext } from "../context";
import CheckoutItemBox from "../components/Store/CheckoutItemBox";

// Mui
import {
  Box,
  Paper,
  Container,
  Typography,
  Grid,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link as MuiLink,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paperBox: {
    padding: "20px 30px",
  },
  mainHeading: {
    fontSize: "1.8rem",
    paddingBottom: "8px",
    color: "#444444",
  },
  formInput: {
    margin: "10px auto",
    paddingBottom: "8px",
    color: "#444444",
  },
  formSelect: {
    margin: "10px auto",
    paddingBottom: "8px",
    color: "#444444",
  },
}));

const Checkout = () => {
  const styles = useStyles();
  const { shoppingCart } = useStoreContext();

  return (
    <Container style={{ paddingBottom: "2rem" }}>
      <Box my="1rem">
        {/* Go back link */}
        <Typography>
          <MuiLink color="secondary" className="text-decoration-none" href="/">
            <i className="fas fa-angle-left mb-3 me-1"></i>Go back
          </MuiLink>
        </Typography>
        <Paper className={styles.paperBox}>
          <Grid container spacing={3}>
            <Grid item md={8}>
              <Typography className={styles.mainHeading}>Checkout</Typography>
              <Divider />
              {shoppingCart.items?.map((item) => {
                return <CheckoutItemBox item={item}></CheckoutItemBox>;
              })}
            </Grid>
            <Grid item md={4}>
              <Typography className={styles.mainHeading}>Billing Information</Typography>
              <Divider />
              <Box mt={2}>
                <Box display="flex" justifyContent="space-between">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="filled"
                    fullWidth
                    size="small"
                    className={styles.formInput}
                    style={{ marginRight: "15px" }}
                  />

                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="filled"
                    fullWidth
                    size="small"
                    className={styles.formInput}
                  />
                </Box>

                <TextField
                  id="outlined-basic"
                  label="Street Address"
                  variant="filled"
                  fullWidth
                  size="small"
                  className={styles.formInput}
                />
                <Box display="flex" justifyContent="space-between">
                  <FormControl
                    variant="filled"
                    className={styles.formSelect}
                    fullWidth
                    style={{ marginRight: "15px" }}
                  >
                    <InputLabel id="demo-simple-select-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value=""
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="filled"
                    className={styles.formSelect}
                    fullWidth
                  >
                    <InputLabel id="demo-simple-select-label">City</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value=""
                      // onChange={handleChange}
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <TextField
                  id="outlined-basic"
                  label="Street Address"
                  variant="filled"
                  fullWidth
                  size="small"
                  className={styles.formInput}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Checkout;
