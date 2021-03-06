import React from "react";
import { useStoreContext } from "../context";
import CheckoutItemBox from "../components/Store/CheckoutItemBox";
import Link from "next/link";
import { getNewTotalPrice } from "../shared/helperFunctions";

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
  Button,
  useTheme
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
  const { selectedStore, shoppingCart, setShoppingCart } = useStoreContext();
  const theme = useTheme()

  const secondary = theme.palette.secondary.main

  const removeItem = (idx) => {
    // Duplicate shopping cart items array
    let newShoppingCart = { ...shoppingCart };

    // Remove item from array
    newShoppingCart.items.splice(idx, 1);

    // Update totalPrice with updated shopping cart items
    newShoppingCart.totalPrice = getNewTotalPrice(newShoppingCart.items);

    // Update context state
    setShoppingCart(newShoppingCart);
  };

  return (
    <Container style={{ paddingBottom: "2rem" }}>
      <Box my="1rem">
        {/* Go back link */}
        <Typography>
          <Link
            
            href={`/stores/${selectedStore?.id}`}
          >
            <a className="text-decoration-none" style={{color: secondary}}>
              <i className="fas fa-angle-left mb-3 me-1"></i>Go back
            </a>
          </Link>
        </Typography>
        <Grid container spacing={3} style={{ alignItems: "stretch" }}>
          <Grid item md={8} style={{ height: "100%" }}>
            <Paper className={styles.paperBox}>
              <Typography className={styles.mainHeading}>Checkout</Typography>
              <Divider />
              {shoppingCart.items?.map((item, idx) => {
                return (
                  <CheckoutItemBox
                    item={item}
                    removeItem={() => removeItem(idx)}
                  ></CheckoutItemBox>
                );
              })}
            </Paper>
          </Grid>
          <Grid item md={4}>
            <Paper className={styles.paperBox}>
              <Typography className={styles.mainHeading}>
                Billing Information
              </Typography>
              <Divider />
              <Box mt={2}>
                <Box display="flex" justifyContent="space-between">
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="filled"
                    fullWidth
                    size="small"
                    className={styles.formInput}
                    style={{ marginRight: "15px" }}
                  />

                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="filled"
                    fullWidth
                    size="small"
                    className={styles.formInput}
                  />
                </Box>

                <TextField
                  id="streetAddress"
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
                  id="additional"
                  label="Additional information"
                  variant="filled"
                  fullWidth
                  size="small"
                  className={styles.formInput}
                />
              </Box>
              {/* Total price info */}
              <Box mt={3}>
                {/* Subtotal */}
                <Box
                  mt={2}
                  mb={0.2}
                  display="flex"
                  justifyContent="space-between"
                  className="gray-muted"
                >
                  <Typography>Subtotal: </Typography>
                  <Typography>${shoppingCart.totalPrice.toFixed(2)}</Typography>
                </Box>
                {/* Service cost */}
                <Box
                  mb={1}
                  display="flex"
                  justifyContent="space-between"
                  className="gray-muted"
                >
                  <Typography>Service cost: </Typography>
                  <Typography>$2</Typography>
                </Box>
                <Divider style={{ opacity: 0.8 }} />
                {/* Total price */}
                <Box
                  mt={1}
                  mb={2}
                  display="flex"
                  justifyContent="space-between"
                  className="green-text"
                >
                  <Typography variant="h5">Total: </Typography>
                  <Typography variant="h5">
                    ${(shoppingCart.totalPrice + 2).toFixed(2)}
                  </Typography>
                </Box>
                <Link href="/">
                  <Button
                    fullWidth
                    variant="contained"
                    float="right"
                    size="large"
                    color="primary"
                    style={{ color: "white" }}
                  >
                    Go to checkout
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Checkout;
